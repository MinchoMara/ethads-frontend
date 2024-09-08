import { FormProvider, useForm } from "react-hook-form";
import { UIProps } from "~/components/UIProps";
import Button from "~/components/atoms/Button/Button";
import { ImageInput } from "~/components/atoms/File/ImageInput";
import { Icon20 } from "~/components/atoms/Icon/Icon20";
import Textfield from "~/components/atoms/Textfield/Textfield";
import { useModalContext } from "~/contexts/ModalProvider";
import { useAdManager } from "~/hooks/useAdManager";
import { PurchaseAdsInput } from "~/types/purchase-ads.input";
import { Patterns } from "~/utils/pattern";
import { Modal } from "../Modal";

export interface PurchaseAdModalProps extends UIProps.Div {
  adId: string;
  occupied: boolean;
  minPrice: string;
}

export const PurchaseAdModal = ({ adId, occupied, minPrice, ...props }: PurchaseAdModalProps) => {
  const { closeModal } = useModalContext();
  const { isProcessing, registerClient } = useAdManager();

  const methods = useForm<PurchaseAdsInput>({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      price: minPrice,
    },
  });
  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = methods;

  const data = watch();
  const adImageUrl = watch("adImageUrl");
  const handleAdImageUrl = (imageUrl: string) => {
    setValue("adImageUrl", imageUrl ?? "", { shouldValidate: true });
  };

  const onValid = async () => {
    try {
      await registerClient(adId, data, occupied);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const onInvalid = () => {
    console.log("Invalid");
  };

  return (
    <Modal {...props}>
      <FormProvider {...methods}>
        <form
          className="absolute left-1/2 top-1/2 w-[504px] -translate-x-1/2 -translate-y-1/2"
          onSubmit={methods.handleSubmit(onValid, onInvalid)}
        >
          <div className="flex flex-col gap-5 self-stretch rounded-md bg-gray-0 p-6">
            {/* Header */}
            <div className="flex items-center justify-between self-stretch">
              <p className="text-18/heading/s text-gray-950">Purchase Ads</p>
              <Icon20.Close onClick={() => closeModal()} />
            </div>
            {/* Occupied */}
            {occupied && (
              <div className="flex items-center gap-2">
                <Icon20.Warning className="text-etc-negative" />
                <div className="text-14/body/m text-etc-negative">
                  This space is already taken, you need to pay more than the existing buyer to purchase it.
                </div>
              </div>
            )}
            {/* Content */}
            <div className="flex flex-col items-start gap-3 self-stretch">
              <Textfield
                {...register(`companyName`, {
                  required: "This field is required",
                  maxLength: { value: 30, message: "Company Name can't exceed 30 characters" },
                  pattern: {
                    value: Patterns.ALPHA_NUMBER_ONLY,
                    message: "Alphabetic characters and numbers only",
                  },
                })}
                required
                label="Company name"
                placeholder="e.g. EthAds"
                error={errors?.companyName?.message}
                className="self-stretch"
              />
              <Textfield
                {...register(`adInfo`, {
                  required: "This field is required",
                  maxLength: { value: 100, message: "Ad Info can't exceed 100 characters" },
                  pattern: {
                    value: Patterns.ALPHA_NUMBER_ONLY,
                    message: "Alphabetic characters and numbers only",
                  },
                })}
                required
                label="Ad Description"
                placeholder="e.g. This ad is for advertising EthAds."
                error={errors?.adInfo?.message}
                className="self-stretch"
              />
              <ImageInput
                {...register(`adImageUrl`, {
                  required: "This field is required",
                })}
                label="Ad Image"
                value={adImageUrl}
                onChange={handleAdImageUrl}
                required
                className="self-stretch"
              />
              <Textfield
                {...register(`price`, {
                  required: "This field is required",
                  pattern: {
                    value: Patterns.FLOAT_NUMBER_ONLY,
                    message: "Please enter a valid price.",
                  },
                })}
                required
                disabled={!occupied}
                label="Price"
                placeholder="e.g. 0.01"
                error={errors?.price?.message}
                className="self-stretch"
                defaultValue={!occupied ? minPrice : undefined}
              />
            </div>
            <Button variant="primary" type="submit" className="self-stretch" disabled={!isValid || isProcessing}>
              {isProcessing ? "Processing..." : "Purchase"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};
