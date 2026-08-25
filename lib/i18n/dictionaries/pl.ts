import type { Dictionary } from "../dictionary-type";

const pl: Dictionary = {
  meta: {
    title: "Little One — lista życzeń dla maluszka",
    description:
      "Stwórz w minutę listę życzeń dla swojego dziecka i wyślij unikalny link rodzinie i znajomym. Bez rejestracji, bez konta, bez podwójnych prezentów.",
  },
  common: {
    brand: "Little One",
    langNames: { pl: "Polski", en: "English", es: "Español" },
    cancel: "Anuluj",
    confirm: "Potwierdzam",
    close: "Zamknij",
    loading: "Chwileczkę…",
    copyLink: "Kopiuj link",
    linkCopied: "Skopiowano!",
    backHome: "Wróć na stronę główną",
  },
  landing: {
    hero: {
      eyebrow: "Dla przyszłych i świeżo upieczonych rodziców",
      title: "Jedna lista.",
      titleHighlight: "Zero powielonych prezentów.",
      subtitle:
        "Załóż listę życzeń dla swojego dziecka w minutę i wyślij jeden link do bliskich. Oni dodają prezenty do koszyka „zarezerwowane”, Ty nie dostajesz trzeciego takiego samego kocyka.",
      scrollCta: "Zobacz, jak to działa",
    },
    howItWorks: {
      title: "Jak to działa",
      subtitle: "Trzy proste kroki, zero zakładania konta.",
      steps: [
        {
          title: "Zostaw e-mail i imię dziecka",
          description:
            "Podajesz swój adres e-mail i imię maluszka. Nic więcej — żadnego hasła, żadnej rejestracji.",
        },
        {
          title: "Odbierz link i dodaj prezenty",
          description:
            "Na maila przychodzi unikalny link edycyjny. Wklejasz linki do wymarzonych produktów, dopisujesz notatki (rozmiar, kolor).",
        },
        {
          title: "Udostępnij bliskim",
          description:
            "Wysyłasz link lub kod QR rodzinie i znajomym. Oni rezerwują prezenty, Ty pilnujesz całości ze swojego linku edycyjnego.",
        },
      ],
    },
    why: {
      title: "Dlaczego Little One",
      subtitle: "Zaprojektowane tak, żeby nikt nie kupił tego samego dwa razy.",
      items: [
        {
          title: "Rezerwacje bez powtórek",
          description:
            "Gdy ktoś zarezerwuje prezent, znika on z puli dostępnych — inni znajomi widzą, że jest już zajęty.",
        },
        {
          title: "Potwierdzenie przed rezerwacją",
          description:
            "Zanim prezent zniknie z listy, prosimy o potwierdzenie — żeby nikt nie kliknął przez przypadek.",
        },
        {
          title: "Pełna kontrola u rodzica",
          description:
            "Tylko Ty, dzięki linkowi edycyjnemu, możesz dodawać, usuwać przedmioty i cofać rezerwacje.",
        },
      ],
    },
    form: {
      title: "Załóż listę dla swojego dziecka",
      subtitle: "Zajmie to mniej niż minutę.",
      babyNameLabel: "Imię dziecka",
      babyNamePlaceholder: "np. Zosia",
      parentNameLabel: "Twoje imię (opcjonalnie)",
      parentNamePlaceholder: "np. Kasia",
      emailLabel: "Twój adres e-mail",
      emailPlaceholder: "ty@przyklad.pl",
      submit: "Stwórz listę życzeń",
      submitting: "Tworzę listę…",
      privacyNote:
        "Adres e-mail służy wyłącznie do rozpoznania, czy masz już aktywną listę. Nie wysyłamy żadnych wiadomości.",
      errors: {
        babyName: "Podaj imię dziecka (2–60 znaków).",
        email: "Podaj poprawny adres e-mail.",
        generic: "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
      },
    },
    success: {
      createdTitle: "Gotowe! Oto Twoja lista",
      createdBody:
        "To Twój prywatny link edycyjny, przypisany do adresu {email}. Zapisz go w bezpiecznym miejscu — to jedyny sposób, żeby wrócić do listy.",
      existsTitle: "Ten e-mail ma już aktywną listę",
      existsBody:
        "Na jeden adres e-mail przypada jedna aktywna lista. Oto link do Twojej istniejącej listy dla {email}.",
      linkLabel: "Link edycyjny",
      copyButton: "Kopiuj link",
      copiedButton: "Skopiowano!",
      goToList: "Przejdź do swojej listy",
      newFormLink: "Załóż inną listę",
    },
    faq: {
      title: "Najczęstsze pytania",
      items: [
        {
          q: "Czy muszę zakładać konto?",
          a: "Nie. Wystarczy e-mail i imię dziecka — link edycyjny jest Twoim jedynym kluczem do listy.",
        },
        {
          q: "Co się stanie, gdy zgubię link?",
          a: "Wróć na stronę główną i podaj ten sam adres e-mail — pokażemy Ci link ponownie.",
        },
        {
          q: "Czy znajomi mogą usunąć rezerwację?",
          a: "Nie. Raz zarezerwowany prezent może odblokować wyłącznie osoba z linkiem edycyjnym (czyli Ty) — dzięki temu nikt nie podbiera prezentu w ostatniej chwili.",
        },
        {
          q: "Jak długo działa lista?",
          a: "Lista i jej linki są aktywne przez 6 miesięcy od utworzenia. Potem można założyć nową listę na ten sam adres e-mail.",
        },
      ],
    },
    recover: {
      toggle: "Masz już listę? Odzyskaj ją przez e-mail",
      title: "Odzyskaj swoją listę",
      subtitle: "Podaj adres e-mail, którego użyto przy zakładaniu listy.",
      emailLabel: "Twój adres e-mail",
      emailPlaceholder: "ty@przyklad.pl",
      submit: "Znajdź moją listę",
      submitting: "Szukam…",
      cancel: "Anuluj",
      foundTitle: "Oto Twoja lista",
      foundBody: "To Twój prywatny link edycyjny dla adresu {email}.",
      linkLabel: "Link edycyjny",
      copyButton: "Kopiuj link",
      copiedButton: "Skopiowano!",
      goToList: "Przejdź do swojej listy",
      tryAnother: "Spróbuj innego adresu e-mail",
      notFoundBody: "Nie znaleźliśmy aktywnej listy dla adresu {email}.",
      errors: {
        email: "Podaj poprawny adres e-mail.",
        generic: "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
      },
    },
    footer: "Zrobione z ♥ dla rodziców i ich maluszków.",
  },
  edit: {
    header: {
      title: "Lista życzeń dla {babyName}",
      subtitle: "To Twój prywatny panel — tylko Ty widzisz ten link.",
      expiresLabel: "Lista aktywna do {date}",
    },
    share: {
      button: "Udostępnij znajomym",
      dialogTitle: "Udostępnij listę {babyName}",
      dialogSubtitle:
        "Wyślij ten link lub pokaż kod QR rodzinie i znajomym. Będą mogli tylko rezerwować prezenty — nie zobaczą tego panelu.",
      copyButton: "Kopiuj link",
      copiedButton: "Skopiowano!",
      qrHint: "Zeskanuj, żeby otworzyć listę na telefonie",
      friendsWarning:
        "Nie wysyłaj tego okna ani linku edycyjnego — tylko link do udostępniania powyżej.",
    },
    addItem: {
      title: "Dodaj prezent do listy",
      titleLabel: "Nazwa przedmiotu",
      titlePlaceholder: "np. Fotelik samochodowy",
      urlLabel: "Link do produktu",
      urlPlaceholder: "https://sklep.pl/produkt",
      noteLabel: "Notatka (opcjonalnie)",
      notePlaceholder: "np. rozmiar 62, dowolny kolor",
      priceLabel: "Cena (opcjonalnie)",
      pricePlaceholder: "np. 250 zł",
      submit: "Dodaj do listy",
      submitting: "Dodaję…",
      errors: {
        title: "Podaj nazwę przedmiotu (2–120 znaków).",
        url: "Dodaj poprawny link do produktu (musi zaczynać się od http:// lub https://).",
        generic: "Nie udało się dodać przedmiotu. Spróbuj ponownie.",
      },
      added: "Dodano do listy!",
      fetchingPreview: "Pobieram dane produktu…",
      previewReady: "Znaleziono produkt — uzupełniono nazwę, cenę i zdjęcie.",
      previewError: "Nie udało się pobrać podglądu tego linku.",
    },
    items: {
      title: "Przedmioty na liście ({count})",
      emptyTitle: "Lista jest jeszcze pusta",
      emptyBody: "Dodaj pierwszy prezent powyżej, żeby zacząć.",
      reservedBy: "Zarezerwowane",
      notReserved: "Dostępne",
      purchasedBadge: "Kupione",
      markPurchasedButton: "Oznacz jako kupione",
      undoPurchaseButton: "Cofnij zakup",
      removeButton: "Usuń",
      removeConfirmTitle: "Usunąć ten przedmiot?",
      removeConfirmBody:
        "Tej operacji nie można cofnąć. Przedmiot zniknie też z listy widocznej dla znajomych.",
      cancelReservationButton: "Cofnij rezerwację",
      cancelReservationConfirmTitle: "Cofnąć tę rezerwację?",
      cancelReservationConfirmBody:
        "Przedmiot ponownie stanie się dostępny dla wszystkich znajomych z linkiem.",
      sections: {
        available: "Dostępne ({count})",
        reserved: "Zarezerwowane ({count})",
        purchased: "Kupione ({count})",
      },
    },
    editLinkWarning:
      "Ten link daje pełną kontrolę nad listą — nie udostępniaj go nikomu poza sobą.",
  },
  list: {
    header: {
      title: "Lista życzeń dla {babyName}",
      subtitle:
        "Kliknij „Zarezerwuj”, żeby dać znać innym, że ten prezent już się znalazł.",
    },
    sections: {
      available: "Dostępne ({count})",
      reserved: "Zarezerwowane ({count})",
    },
    item: {
      reserveButton: "Zarezerwuj",
      reservedBadge: "Zarezerwowane",
    },
    reserveDialog: {
      title: "Potwierdź rezerwację",
      body: "Ta rezerwacja jest anonimowa — rodzic i inni goście zobaczą tylko, że prezent jest zajęty, bez informacji kto go zarezerwował. Rezerwacji nie da się samodzielnie cofnąć — jeśli się rozmyślisz, poproś rodzica o odblokowanie prezentu.",
      confirm: "Tak, rezerwuję",
      submitting: "Rezerwuję…",
      cancel: "Anuluj",
      warning:
        "Po potwierdzeniu ten prezent zniknie z puli dostępnych dla innych.",
    },
    errors: {
      alreadyReserved: "Ups, ktoś właśnie zarezerwował ten prezent przed Tobą.",
      generic: "Nie udało się zarezerwować. Spróbuj ponownie.",
    },
    empty: {
      title: "Lista jest jeszcze pusta",
      body: "Rodzice nie dodali jeszcze żadnych prezentów — zajrzyj tu później.",
    },
    footer: "Stworzone w Little One",
  },
  notFound: {
    title: "Nie znaleziono listy",
    body: "Ten link jest nieprawidłowy albo lista wygasła (linki są aktywne przez 6 miesięcy).",
  },
};

export default pl;
