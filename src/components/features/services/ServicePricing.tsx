import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { PricingData } from "@/data/services/types";

interface ServicePricingProps {
  data: PricingData;
  serviceSlug?: string;
}

export function ServicePricing({ data, serviceSlug }: ServicePricingProps) {
  return (
    <section id="pricing" className="section bg-white scroll-mt-24">
      <div className="container">
        <SectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />

        <div className="mt-10 text-center">
          <Link href={`/contact${serviceSlug ? `?session=${serviceSlug}` : ""}`}>
            <Button variant="primary" size="lg">
              Get a Custom Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
