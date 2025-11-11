import HeroSection from "@/layout/components/homepage/HeroSection.jsx";
import FeaturesCourse from "@/layout/components/homepage/FeaturesCourse.jsx";
import FeatureSection from "@/layout/components/homepage/FeatureSection.jsx";

export default function HomePage() {
    return (
        <div className="flex flex-col">
            <HeroSection/>
            <FeaturesCourse/>
            <FeatureSection/>
        </div>
    );
}