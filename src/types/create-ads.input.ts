export enum SupportedNetwork {
  ARBITRUM = "arbitrum",
}

export class CreateAdsInput {
  name!: string;
  network!: keyof typeof SupportedNetwork;
  location!: string;
  adExampleImageUrl!: string;
  minimumExposure!: number;
  maximumExposure!: number;
  dau!: number;
  price!: number;
}
