import type { Dictionary } from "../dictionary-type";

const en: Dictionary = {
  meta: {
    title: "Little One — a wishlist for your baby",
    description:
      "Create a wishlist for your baby in a minute and send a unique link to family and friends. No account, no sign-up, no duplicate gifts.",
  },
  common: {
    brand: "Little One",
    langNames: { pl: "Polski", en: "English", es: "Español" },
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    loading: "One moment…",
    copyLink: "Copy link",
    linkCopied: "Copied!",
    backHome: "Back to homepage",
  },
  landing: {
    hero: {
      eyebrow: "For parents-to-be and new parents",
      title: "One list.",
      titleHighlight: "Zero duplicate gifts.",
      subtitle:
        "Set up a wishlist for your baby in a minute and send a single link to the people you love. They reserve gifts so nobody ends up with the third identical blanket.",
      scrollCta: "See how it works",
    },
    howItWorks: {
      title: "How it works",
      subtitle: "Three simple steps, no account required.",
      steps: [
        {
          title: "Share your email and baby's name",
          description:
            "Just your email address and your baby's name. No password, no sign-up.",
        },
        {
          title: "Get your link and add gifts",
          description:
            "A unique edit link lands in your inbox. Paste links to the products you'd love, add notes like size or colour.",
        },
        {
          title: "Share with your loved ones",
          description:
            "Send the link or QR code to family and friends. They reserve gifts, and you stay in full control from your own edit link.",
        },
      ],
    },
    why: {
      title: "Why Little One",
      subtitle: "Designed so nobody ever buys the same thing twice.",
      items: [
        {
          title: "No duplicate reservations",
          description:
            "Once someone reserves a gift, it's marked as taken — other guests can see it's already spoken for.",
        },
        {
          title: "Confirmation before reserving",
          description:
            "Before a gift disappears from the list, we ask for a quick confirmation, so nobody taps it by accident.",
        },
        {
          title: "Full control stays with the parent",
          description:
            "Only you, using your edit link, can add or remove items and undo a reservation.",
        },
      ],
    },
    form: {
      title: "Create a list for your baby",
      subtitle: "It takes less than a minute.",
      babyNameLabel: "Baby's name",
      babyNamePlaceholder: "e.g. Zoe",
      parentNameLabel: "Your name (optional)",
      parentNamePlaceholder: "e.g. Kate",
      emailLabel: "Your email address",
      emailPlaceholder: "you@example.com",
      submit: "Create my wishlist",
      submitting: "Creating your list…",
      privacyNote:
        "We only use your email to check whether you already have an active list. We never send you anything.",
      errors: {
        babyName: "Please enter a name (2–60 characters).",
        email: "Please enter a valid email address.",
        generic: "Something went wrong. Please try again in a moment.",
      },
    },
    success: {
      createdTitle: "All set! Here's your list",
      createdBody:
        "This is your private edit link, tied to {email}. Save it somewhere safe — it's the only way back to your list.",
      existsTitle: "This email already has an active list",
      existsBody:
        "Each email address can have one active list at a time. Here's the link to your existing list for {email}.",
      linkLabel: "Edit link",
      copyButton: "Copy link",
      copiedButton: "Copied!",
      goToList: "Go to your list",
      newFormLink: "Create another list",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "Do I need to create an account?",
          a: "No. Just your email and your baby's name — your edit link is the only key you need.",
        },
        {
          q: "What if I lose my link?",
          a: "Head back to the homepage and enter the same email address — we'll show it to you again.",
        },
        {
          q: "Can a guest cancel a reservation?",
          a: "No. Once a gift is reserved, only the person with the edit link (that's you) can free it up again — so nobody snipes a gift at the last minute.",
        },
        {
          q: "How long does a list stay active?",
          a: "Your list and its links stay active for 6 months after creation. After that, you can create a new list with the same email address.",
        },
      ],
    },
    recover: {
      toggle: "Already have a list? Recover it by email",
      title: "Recover your list",
      subtitle: "Enter the email you used to create it.",
      emailLabel: "Your email address",
      emailPlaceholder: "you@example.com",
      submit: "Find my list",
      submitting: "Looking…",
      cancel: "Cancel",
      foundTitle: "Here's your list",
      foundBody: "This is your private edit link for {email}.",
      linkLabel: "Edit link",
      copyButton: "Copy link",
      copiedButton: "Copied!",
      goToList: "Go to your list",
      tryAnother: "Try another email",
      notFoundBody: "We couldn't find an active list for {email}.",
      errors: {
        email: "Please enter a valid email address.",
        generic: "Something went wrong. Please try again in a moment.",
      },
    },
    footer: "Made with ♥ for parents and their little ones.",
  },
  edit: {
    header: {
      title: "Wishlist for {babyName}",
      subtitle: "This is your private dashboard — only you can see this link.",
      expiresLabel: "Active until {date}",
    },
    share: {
      button: "Share with friends",
      dialogTitle: "Share {babyName}'s list",
      dialogSubtitle:
        "Send this link or show the QR code to family and friends. They can only reserve gifts — they won't see this dashboard.",
      copyButton: "Copy link",
      copiedButton: "Copied!",
      qrHint: "Scan to open the list on a phone",
      friendsWarning:
        "Don't share this window or your edit link — only the share link above.",
    },
    addItem: {
      title: "Add a gift to the list",
      titleLabel: "Item name",
      titlePlaceholder: "e.g. Car seat",
      urlLabel: "Product link",
      urlPlaceholder: "https://store.com/product",
      noteLabel: "Note (optional)",
      notePlaceholder: "e.g. size 3-6m, any colour",
      priceLabel: "Price (optional)",
      pricePlaceholder: "e.g. $45",
      submit: "Add to list",
      submitting: "Adding…",
      errors: {
        title: "Please enter an item name (2–120 characters).",
        url: "Add a valid product link (must start with http:// or https://).",
        generic: "Couldn't add the item. Please try again.",
      },
      added: "Added to the list!",
      fetchingPreview: "Fetching product info…",
      previewReady: "Found the product — name, price and photo filled in.",
      previewError: "Couldn't fetch a preview for that link.",
    },
    items: {
      title: "Items on the list ({count})",
      emptyTitle: "The list is still empty",
      emptyBody: "Add your first gift above to get started.",
      reservedBy: "Reserved",
      notReserved: "Available",
      purchasedBadge: "Purchased",
      privateBadge: "Only visible to you",
      markPurchasedButton: "Mark as purchased",
      undoPurchaseButton: "Undo purchase",
      makePrivateButton: "Only visible to me",
      makePublicButton: "Show on shared list",
      removeButton: "Remove",
      removeConfirmTitle: "Remove this item?",
      removeConfirmBody:
        "This can't be undone. The item will also disappear from the list your friends see.",
      cancelReservationButton: "Undo reservation",
      cancelReservationConfirmTitle: "Undo this reservation?",
      cancelReservationConfirmBody:
        "The item will become available again for everyone with the link.",
      sections: {
        available: "Available ({count})",
        reserved: "Reserved ({count})",
        purchased: "Purchased ({count})",
        private: "Only visible to you ({count})",
      },
    },
    editLinkWarning:
      "This link gives full control over the list — don't share it with anyone but yourself.",
  },
  list: {
    header: {
      title: "Wishlist for {babyName}",
      subtitle:
        "Tap “Reserve” to let everyone know this gift has been taken care of.",
    },
    sections: {
      available: "Available ({count})",
      reserved: "Reserved ({count})",
    },
    item: {
      reserveButton: "Reserve",
      reservedBadge: "Reserved",
    },
    reserveDialog: {
      title: "Confirm your reservation",
      body: "This reservation is anonymous — the parent and other guests will only see that the gift is taken, not who reserved it. It can't be undone by you; if you change your mind, ask the parent to free it up again.",
      confirm: "Yes, reserve it",
      submitting: "Reserving…",
      cancel: "Cancel",
      warning: "Once confirmed, this gift will no longer be available to others.",
    },
    errors: {
      alreadyReserved: "Oops, someone else just reserved this gift before you.",
      generic: "Couldn't complete the reservation. Please try again.",
    },
    empty: {
      title: "The list is still empty",
      body: "The parents haven't added any gifts yet — check back later.",
    },
    footer: "Made with Little One",
  },
  notFound: {
    title: "List not found",
    body: "This link is invalid or the list has expired (links stay active for 6 months).",
  },
};

export default en;
