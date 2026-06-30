import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustedCompanies from '../components/TrustedCompanies';
import FeaturesGrid from '../components/FeaturesGrid';
import PaymentFlow from '../components/PaymentFlow';
import MultiProcessor from '../components/MultiProcessor';
import WhiteLabel from '../components/WhiteLabel';
import DashboardPreviews from '../components/DashboardPreviews';
import Pricing from '../components/Pricing';
import SecuritySection from '../components/SecuritySection';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="bg-[#09090B] min-h-screen text-white font-sans selection:bg-[#7C3AED]/30">
      <Navbar />
      <main>
        <HeroSection />
        <TrustedCompanies />
        <FeaturesGrid />
        <PaymentFlow />
        <MultiProcessor />
        <WhiteLabel />
        <DashboardPreviews />
        <Pricing />
        <SecuritySection />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
