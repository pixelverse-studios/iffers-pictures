"use client";

import { useLayoutVariant } from "@/context/LayoutVariantContext";
import type { ServicePageData } from "@/data/services/types";
import type { SESSIONS } from "@/lib/constants";
import {
  DEFAULT_LAYOUT_VARIANT_ID,
  type LayoutVariantId,
} from "@/lib/layout-variants";
import { BoardServiceDetailLayout } from "./BoardServiceDetailLayout";
import { ServiceHero } from "./ServiceHero";
import { ServiceBenefits } from "./ServiceBenefits";
import { ServiceGallery } from "./ServiceGallery";
import { ServiceTestimonials } from "./ServiceTestimonials";
import { ServicePricing } from "./ServicePricing";
import { ServiceFAQ } from "./ServiceFAQ";
import { ServiceCTA } from "./ServiceCTA";

type SessionInfo = (typeof SESSIONS)[number];

interface ServicePageContentProps {
  serviceData: ServicePageData;
  serviceInfo: SessionInfo;
  initialLayoutVariantId?: LayoutVariantId;
}

export function ServicePageContent({
  serviceData,
  serviceInfo,
  initialLayoutVariantId = DEFAULT_LAYOUT_VARIANT_ID,
}: ServicePageContentProps) {
  const { isBoardLayout, mounted } = useLayoutVariant();
  const shouldRenderBoard =
    mounted ? isBoardLayout : initialLayoutVariantId === "board";

  if (shouldRenderBoard) {
    return (
      <BoardServiceDetailLayout
        serviceData={serviceData}
        serviceInfo={serviceInfo}
      />
    );
  }

  return (
    <>
      <ServiceHero
        data={serviceData.hero}
        serviceName={serviceInfo.name}
        serviceSlug={serviceData.slug}
      />
      <ServiceBenefits
        benefits={serviceData.benefits}
        whatToExpect={serviceData.whatToExpect}
      />
      <ServiceGallery
        data={serviceData.gallery}
        serviceSlug={serviceData.slug}
      />
      {serviceData.testimonials && (
        <ServiceTestimonials data={serviceData.testimonials} />
      )}
      <ServicePricing
        data={serviceData.pricing}
        serviceSlug={serviceData.slug}
      />
      <ServiceFAQ data={serviceData.faq} />
      <ServiceCTA data={serviceData.cta} serviceSlug={serviceData.slug} />
    </>
  );
}
