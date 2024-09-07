import { FormProvider, useForm } from "react-hook-form";
import Button from "~/components/atoms/Button/Button";
import { ImageInput } from "~/components/atoms/File/ImageInput";
import Textfield from "~/components/atoms/Textfield/Textfield";
import { useAdManager } from "~/hooks/useAdManager";
import { CreateAdsInput } from "~/types/create-ads.input";
import { Patterns } from "~/utils/pattern";

export interface RegisterAdFormProps {}

export const RegisterAdForm = ({}: RegisterAdFormProps) => {
  /* Contract Interaction */
  const { isProcessing, registerAds } = useAdManager();

  /* Form */
  const methods = useForm<CreateAdsInput>({ mode: "onChange", shouldFocusError: true });
  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = methods;
  const data = watch();

  const adExampleImageUrl = watch("adExampleImageUrl");

  const handleAdExampleImageChange = (imageUrl: string) => {
    setValue("adExampleImageUrl", imageUrl ?? "", { shouldValidate: true });
  };

  const onValid = async () => {
    await registerAds(data);
  };

  const onInvalid = () => {
    console.log("Invalid");
  };

  return (
    <FormProvider {...methods}>
      <form className="flex w-[800px] flex-col items-start gap-6" onSubmit={methods.handleSubmit(onValid, onInvalid)}>
        {/* Title */}
        <span className="text-24/heading/l">Register New Ads</span>
        {/* Fields */}
        <div className="flex flex-col items-end gap-8 self-stretch">
          <div className="flex w-full flex-col items-start gap-3">
            <div className="flex items-center gap-6 self-stretch">
              <Textfield
                {...register(`name`, {
                  required: "This field is required",
                  maxLength: { value: 30, message: "Name can't exceed 30 characters" },
                  pattern: {
                    value: Patterns.ALPHA_NUMBER_ONLY,
                    message: "Alphabetic characters and numbers only",
                  },
                })}
                required
                label="Product name"
                placeholder="e.g. EthAds"
                error={errors?.name?.message}
                className="flex-1"
              />
            </div>
            <Textfield
              {...register(`location`, {
                required: "This field is required",
                maxLength: { value: 30, message: "Location can't exceed 30 characters" },
                pattern: {
                  value: Patterns.ALPHA_NUMBER_ONLY,
                  message: "Alphabetic characters and numbers only",
                },
              })}
              required
              label="Location"
              placeholder="e.g. Top Space"
              error={errors?.location?.message}
              className="self-stretch"
            />
            <ImageInput
              label="Ad Information"
              value={adExampleImageUrl}
              onChange={handleAdExampleImageChange}
              required
              className="self-stretch"
            />
            <div className="flex items-center gap-6 self-stretch">
              <Textfield
                {...register(`minimumExposure`, {
                  required: "This field is required",
                  pattern: {
                    value: Patterns.NUMBER_ONLY,
                    message: "Numbers only",
                  },
                })}
                required
                label="Minimum Exposure"
                placeholder="e.g. 1"
                error={errors?.minimumExposure?.message}
                className="flex-1"
              />
              <Textfield
                {...register(`maximumExposure`, {
                  required: "This field is required",
                  pattern: {
                    value: Patterns.NUMBER_ONLY,
                    message: "Numbers only",
                  },
                })}
                required
                label="Maximum Exposure"
                placeholder="e.g. 30"
                error={errors?.maximumExposure?.message}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-6 self-stretch">
              <Textfield
                {...register(`dau`, {
                  required: "This field is required",
                  pattern: {
                    value: Patterns.NUMBER_ONLY,
                    message: "Numbers only",
                  },
                })}
                required
                label="Service DAU"
                placeholder="e.g. 30000"
                error={errors?.dau?.message}
                className="flex-1"
              />
              <Textfield
                {...register(`price`, {
                  required: "This field is required",
                  pattern: {
                    value: Patterns.FLOAT_NUMBER_ONLY,
                    message: "Numbers only",
                  },
                })}
                required
                label="Minimum Price"
                placeholder="e.g. 1.5"
                error={errors?.price?.message}
                className="flex-1"
              />
            </div>
          </div>
          <Button variant="primary" type="submit" className="w-[200px]" disabled={!isValid || isProcessing}>
            {isProcessing ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
