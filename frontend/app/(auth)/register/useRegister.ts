import AuthService from "@/app/services/auth.service";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useMutation, useQuery } from "react-query";
import * as y from "yup";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUserSession } from "@/app/interfaces/IUser";
import { useEffect } from "react";
import { useWallet } from "@/app/store/WalletStore";
import ReferralService from "@/app/services/referral.service";
import qs from "qs";

const singUpSchema = y.object({
  email: y
    .string()
    .email("email address must be valid")
    .required("email address is required"),
  password: y
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters long"),
  name: y.string().required("name is required"),
  referralCode: y.string(),
});

export default function useRegister() {
  const navigate = useRouter();
  const { walletAddress } = useWallet();

  const { data } = useSession();
  const user = data?.user as IUserSession;

  useEffect(() => {
    if (user) redirectToPage();
  }, [user]);

  // redirect to route
  const redirectToPage = () => {
    switch (user.data.role.name) {
      case "Authenticated":
        navigate.push("/");
        break;
      case "Admin":
        navigate.push("/admin");
        break;
      default:
        navigate.push("/");
        break;
    }
  };

  const initialValues = {
    email: "",
    password: "",
    name: "",
    referralCode: "",
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: singUpSchema,
    onSubmit: async (values) => {
      try {
        if (!walletAddress) {
          toast.error("Please connect your meta mask wallet account");
          return;
        }

        const registrationData = {
          username: values.name,
          walletAddress,
          ...values,
        };

        await register({
          username: values.name,
          walletAddress,
          ...values,
        });

        if (values.referralCode) {
          registrationData.referralCode = values.referralCode;

          const query = qs.stringify({
            fields: ["user_id", "refferId,isAccountCreated"],
            filters: {
              refferId: {
                $eq: values.referralCode,
              },
            },
          });

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useQuery(
            ["referrals"],
            () => ReferralService.getReferral(user.token, query),
            {
              onSuccess({ data }) {
                if (data) {
                  console.log(data);
                }
              },
              enabled: user ? true : false,
            }
          );
        }

        // to create the cookie in next auth for further authentication
        const res = await signIn("credentials", {
          ...values,
          redirect: false,
        });

        if (res?.error) throw new Error(res.error);

        // base on user role navigate to particular page
        redirectToPage();
      } catch (error: any) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.error.message);
        } else {
          toast.error(error.message);
        }
      }
    },
  });

  const { mutateAsync: register, isLoading } = useMutation(
    AuthService.register
  );

  const { mutateAsync: getReferrals } = useMutation((query: string) =>
    ReferralService.getReferral(user.token, query)
  );

  return {
    actions: { handleChange, handleSubmit },
    states: { values, errors, isLoading },
  };
}
