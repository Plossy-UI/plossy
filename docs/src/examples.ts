// Lista przykładowych stron (galeria /examples/).
export const examples = [
  { group: 'Sklep', slug: 'sklep', title: 'Strona główna sklepu', text: 'Hero ze slideshow, kafle kategorii, karuzela produktów, baner promocyjny, newsletter.' },
  { group: 'Sklep', slug: 'kategoria', title: 'Kategoria', text: 'Lista produktów z filtrami, sortowaniem, paginacją i panelem filtrów na mobile.' },
  { group: 'Sklep', slug: 'produkt', title: 'Karta produktu', text: 'Galeria z lightboxem, warianty, zakładki, opinie i produkty powiązane.' },
  { group: 'Sklep', slug: 'koszyk', title: 'Koszyk i zamówienie', text: 'Koszyk, podsumowanie i kroki zamówienia ze stepperem.' },
  { group: 'Treść', slug: 'cms', title: 'Strona tekstowa (CMS)', text: 'Strona „O nas" / regulamin: typografia artykułu, spis treści, cytaty, tabele.' },
  { group: 'Treść', slug: 'kontakt', title: 'Kontakt i FAQ', text: 'Formularz z walidacją, dane kontaktowe i najczęstsze pytania.' },
  { group: 'Treść', slug: 'blog', title: 'Blog — lista wpisów', text: 'Wyróżniony wpis, siatka kart, kategorie i paginacja.' },
  { group: 'Treść', slug: 'wpis', title: 'Blog — wpis', text: 'Artykuł z autorem, komentarzami i powiązanymi wpisami.' },
  { group: 'Treść', slug: 'blad-404', title: 'Błąd 404', text: 'Strona „nie znaleziono" z wyszukiwarką i skrótami.' },
  { group: 'Treść', slug: 'logowanie', title: 'Logowanie i rejestracja', text: 'Formularze konta z zakładkami, siłą hasła i kodem OTP.' },
  { group: 'Wzorce', slug: 'karty', title: 'Karty', text: 'Galeria wzorców kart: produkt, wpis, cennik, profil, statystyka, opinia.' },
  { group: 'Wzorce', slug: 'slidery', title: 'Slidery', text: 'Slideshow hero, karuzele produktów, opinie, logotypy, galeria z miniaturami.' },
  { group: 'Wzorce', slug: 'landing', title: 'Landing page', text: 'Strona produktu SaaS: hero, funkcje, cennik, opinie, FAQ i CTA.' },
  { group: 'Wzorce', slug: 'panel', title: 'Panel administracyjny', text: 'Dashboard z nawigacją boczną, statystykami, tabelą i aktywnością.' },
] as const;
