import FeatureHero from "@/app/(features)/sections/feature-hero";
import FeatureGallery from "@/app/(features)/sections/feature-gallery";
import FeatureHighlights from "@/app/(features)/sections/feature-highlights";
import FeatureSources from "@/app/(features)/sections/feature-sources";
import CommunitySection from "@/app/(features)/sections/community-section";
import DownloadSection from "@/app/(features)/sections/download-section";
import PageChrome from "@/app/(features)/components/page-chrome";

export default function Home() {
  return (
    <PageChrome>
      <FeatureHero />
      <FeatureHighlights />
      <FeatureGallery />
      <FeatureSources />
      <CommunitySection />
      <DownloadSection />
    </PageChrome>
  );
}
