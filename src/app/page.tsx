import BookSpace from '@/components/home/BookSpace';
import ClientPart from '@/components/home/ClientPart';
import Hero from '@/components/home/Hero';
import HeroFooter from '@/components/home/HeroFooter';
import PopularLocation from '@/components/home/PopularLocation';
import Rental from '@/components/home/Rental';
import Suits from '@/components/home/Suits';

export default async function Home() {
  return (
    <main>
      <Hero />
      <HeroFooter />
      <BookSpace />
      <Suits />
      <PopularLocation />
      <Rental />
      <ClientPart />
    </main>
  );
}
