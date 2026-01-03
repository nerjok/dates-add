import Link from "next/link";
import PageHeader from "./components/page-header";
import Category, { IconStyle, TestimonialsDiv } from "./components/category";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <PageHeader />
      <div className="p-4 categories">
        <Category className="mb-3 page-category" link="/browse/mm">
          👨&zwj;❤️&zwj;👩
        </Category>
        <Category className="mb-3 page-category" link="/browse/mf">
          👨&zwj;❤️&zwj;👨
        </Category>
        <Category className="mb-3 page-category" link="/browse/fm">
          👩&zwj;❤️&zwj;👨
        </Category>
        <Category className="mb-3 page-category" link="/browse/ff">
          👩&zwj;❤️&zwj;👩
        </Category>
      </div>

      <div className="testimonials">
        <div className="testimonial-entry text-center">
          <TestimonialsDiv $bgColor="#FCE7F3">
            <IconStyle>
              <span>&#8987;</span>
            </IconStyle>
          </TestimonialsDiv>
          <h2>{t('simple_and_clean')}</h2>
          <p>
            {t('minimalist-design')}
          </p>
        </div>

        <div className="testimonial-entry text-center">
          <TestimonialsDiv $bgColor="#DBEAFE">
            <IconStyle>
              <span>&#9971;</span>
            </IconStyle>
          </TestimonialsDiv>
          <h2>{t('easy_to_use')}</h2>
          <p>{t('browse_profiles_and_connect')}</p>
        </div>

        <div className="testimonial-entry text-center">
          <TestimonialsDiv $bgColor="#F3E8FF">
            <IconStyle>
              <span>&#9997;</span>
            </IconStyle>
          </TestimonialsDiv>
          <h2>{t('real_connections')}</h2>
          <p>{t('content-focus')}</p>
        </div>
      </div>
    </>
  );
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <Link href="/rules">Rules</Link> |<Link href="/pages">Pages</Link>
      </main>
    </div>
  );
}
