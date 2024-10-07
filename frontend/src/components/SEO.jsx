import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ lang }) => {
  const seoContent = {
    en: {
      title: "Bargaoui Curtains | Custom Curtains in Tunisia",
      description: "Shop custom curtains and blinds at Bargaoui Curtains. We offer custom-made rideaux for your home.",
      keywords: "Bargaoui, Bargaoui Rideaux, Custom Curtains, Store, Curtains, Rideaux, Tunisia",
    },
    fr: {
      title: "Bargaoui Rideaux | Rideaux sur mesure et Store en Tunisie",
      description: "Achetez des rideaux et stores sur mesure chez Bargaoui Rideaux en Tunisie.",
      keywords: "Bargaoui, Bargaoui Rideaux, Rideaux sur mesure, Store, Rideaux Tunisie",
    },
    ar: {
      title: "بَرْقَاوي للستائر | ستائر مخصصة ومحل ستائر في تونس",
      description: "تسوق الستائر المخصصة والستائر العاتمة في بَرْقَاوي للستائر. نقدم لك أفضل الستائر المصممة حسب الطلب.",
      keywords: "بَرْقَاوي, ستائر مخصصة, بَرْقَاوي للستائر, متجر ستائر, ستائر, تونس",
    },
  };

  const { title, description, keywords } = seoContent[lang] || seoContent.en;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default SEO;
