export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  common: {
    brand: string;
    langNames: { pl: string; en: string; es: string };
    cancel: string;
    confirm: string;
    close: string;
    loading: string;
    copyLink: string;
    linkCopied: string;
    backHome: string;
  };
  landing: {
    hero: {
      eyebrow: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      scrollCta: string;
    };
    howItWorks: {
      title: string;
      subtitle: string;
      steps: { title: string; description: string }[];
    };
    why: {
      title: string;
      subtitle: string;
      items: { title: string; description: string }[];
    };
    form: {
      title: string;
      subtitle: string;
      babyNameLabel: string;
      babyNamePlaceholder: string;
      parentNameLabel: string;
      parentNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      submit: string;
      submitting: string;
      privacyNote: string;
      errors: {
        babyName: string;
        email: string;
        generic: string;
      };
    };
    success: {
      createdTitle: string;
      createdBody: string;
      existsTitle: string;
      existsBody: string;
      linkLabel: string;
      copyButton: string;
      copiedButton: string;
      goToList: string;
      newFormLink: string;
    };
    faq: {
      title: string;
      items: { q: string; a: string }[];
    };
    recover: {
      toggle: string;
      title: string;
      subtitle: string;
      emailLabel: string;
      emailPlaceholder: string;
      submit: string;
      submitting: string;
      cancel: string;
      foundTitle: string;
      foundBody: string;
      linkLabel: string;
      copyButton: string;
      copiedButton: string;
      goToList: string;
      tryAnother: string;
      notFoundBody: string;
      errors: {
        email: string;
        generic: string;
      };
    };
    footer: string;
  };
  edit: {
    header: {
      title: string;
      subtitle: string;
      expiresLabel: string;
    };
    share: {
      button: string;
      dialogTitle: string;
      dialogSubtitle: string;
      copyButton: string;
      copiedButton: string;
      qrHint: string;
      friendsWarning: string;
    };
    addItem: {
      title: string;
      titleLabel: string;
      titlePlaceholder: string;
      urlLabel: string;
      urlPlaceholder: string;
      noteLabel: string;
      notePlaceholder: string;
      priceLabel: string;
      pricePlaceholder: string;
      submit: string;
      submitting: string;
      errors: {
        title: string;
        url: string;
        generic: string;
      };
      added: string;
      fetchingPreview: string;
      previewReady: string;
      previewError: string;
    };
    items: {
      title: string;
      emptyTitle: string;
      emptyBody: string;
      reservedBy: string;
      notReserved: string;
      purchasedBadge: string;
      markPurchasedButton: string;
      undoPurchaseButton: string;
      removeButton: string;
      removeConfirmTitle: string;
      removeConfirmBody: string;
      cancelReservationButton: string;
      cancelReservationConfirmTitle: string;
      cancelReservationConfirmBody: string;
      sections: {
        available: string;
        reserved: string;
        purchased: string;
      };
    };
    editLinkWarning: string;
  };
  list: {
    header: {
      title: string;
      subtitle: string;
    };
    sections: {
      available: string;
      reserved: string;
    };
    item: {
      reserveButton: string;
      reservedBadge: string;
    };
    reserveDialog: {
      title: string;
      body: string;
      confirm: string;
      submitting: string;
      cancel: string;
      warning: string;
    };
    errors: {
      alreadyReserved: string;
      generic: string;
    };
    empty: {
      title: string;
      body: string;
    };
    footer: string;
  };
  notFound: {
    title: string;
    body: string;
  };
}

export type DictionaryVars = Record<string, string>;

export function t(template: string, vars?: DictionaryVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? vars[key] : match
  );
}
