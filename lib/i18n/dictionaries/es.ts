import type { Dictionary } from "../dictionary-type";

const es: Dictionary = {
  meta: {
    title: "Little One — una lista de deseos para tu bebé",
    description:
      "Crea en un minuto una lista de deseos para tu bebé y envía un enlace único a familiares y amigos. Sin cuenta, sin registro, sin regalos duplicados.",
  },
  common: {
    brand: "Little One",
    langNames: { pl: "Polski", en: "English", es: "Español" },
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Cerrar",
    loading: "Un momento…",
    copyLink: "Copiar enlace",
    linkCopied: "¡Copiado!",
    backHome: "Volver al inicio",
  },
  landing: {
    hero: {
      eyebrow: "Para futuros padres y padres primerizos",
      title: "Una lista.",
      titleHighlight: "Cero regalos duplicados.",
      subtitle:
        "Crea una lista de deseos para tu bebé en un minuto y envía un único enlace a tus seres queridos. Ellos reservan los regalos, así nadie termina con la tercera manta idéntica.",
      scrollCta: "Ver cómo funciona",
    },
    howItWorks: {
      title: "Cómo funciona",
      subtitle: "Tres pasos sencillos, sin necesidad de cuenta.",
      steps: [
        {
          title: "Deja tu email y el nombre del bebé",
          description:
            "Solo tu correo electrónico y el nombre de tu bebé. Sin contraseña, sin registro.",
        },
        {
          title: "Recibe tu enlace y añade regalos",
          description:
            "Un enlace de edición único llega a tu correo. Pega enlaces a los productos que te encantan y añade notas de talla o color.",
        },
        {
          title: "Compártela con tus seres queridos",
          description:
            "Envía el enlace o el código QR a familiares y amigos. Ellos reservan regalos y tú mantienes el control total desde tu enlace de edición.",
        },
      ],
    },
    why: {
      title: "Por qué Little One",
      subtitle: "Diseñada para que nadie compre nunca lo mismo dos veces.",
      items: [
        {
          title: "Sin reservas duplicadas",
          description:
            "En cuanto alguien reserva un regalo, queda marcado como ocupado — los demás invitados ven que ya está reservado.",
        },
        {
          title: "Confirmación antes de reservar",
          description:
            "Antes de que un regalo desaparezca de la lista, pedimos una rápida confirmación para evitar toques accidentales.",
        },
        {
          title: "El control siempre lo tienen los padres",
          description:
            "Solo tú, con tu enlace de edición, puedes añadir o eliminar artículos y deshacer una reserva.",
        },
      ],
    },
    form: {
      title: "Crea una lista para tu bebé",
      subtitle: "Te llevará menos de un minuto.",
      babyNameLabel: "Nombre del bebé",
      babyNamePlaceholder: "p. ej. Sofía",
      parentNameLabel: "Tu nombre (opcional)",
      parentNamePlaceholder: "p. ej. Carla",
      emailLabel: "Tu correo electrónico",
      emailPlaceholder: "tu@ejemplo.com",
      submit: "Crear mi lista",
      submitting: "Creando tu lista…",
      privacyNote:
        "Solo usamos tu correo para comprobar si ya tienes una lista activa. Nunca te enviamos nada.",
      errors: {
        babyName: "Introduce un nombre (2–60 caracteres).",
        email: "Introduce un correo electrónico válido.",
        generic: "Algo salió mal. Inténtalo de nuevo en un momento.",
      },
    },
    success: {
      createdTitle: "¡Listo! Aquí tienes tu lista",
      createdBody:
        "Este es tu enlace privado de edición, vinculado a {email}. Guárdalo en un lugar seguro — es la única forma de volver a tu lista.",
      existsTitle: "Este correo ya tiene una lista activa",
      existsBody:
        "Cada correo puede tener una única lista activa a la vez. Aquí tienes el enlace a tu lista existente para {email}.",
      linkLabel: "Enlace de edición",
      copyButton: "Copiar enlace",
      copiedButton: "¡Copiado!",
      goToList: "Ir a tu lista",
      newFormLink: "Crear otra lista",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Necesito crear una cuenta?",
          a: "No. Solo tu correo y el nombre de tu bebé — tu enlace de edición es la única llave que necesitas.",
        },
        {
          q: "¿Qué pasa si pierdo mi enlace?",
          a: "Vuelve a la página de inicio e introduce el mismo correo electrónico — te lo mostraremos de nuevo.",
        },
        {
          q: "¿Puede un invitado cancelar una reserva?",
          a: "No. Una vez reservado un regalo, solo la persona con el enlace de edición (es decir, tú) puede liberarlo de nuevo — así nadie te quita un regalo en el último momento.",
        },
        {
          q: "¿Cuánto tiempo permanece activa una lista?",
          a: "Tu lista y sus enlaces permanecen activos durante 6 meses tras su creación. Después, puedes crear una nueva lista con el mismo correo.",
        },
      ],
    },
    footer: "Hecho con ♥ para los padres y sus pequeños.",
  },
  edit: {
    header: {
      title: "Lista de deseos de {babyName}",
      subtitle: "Este es tu panel privado — solo tú puedes ver este enlace.",
      expiresLabel: "Activa hasta el {date}",
    },
    share: {
      button: "Compartir con amigos",
      dialogTitle: "Comparte la lista de {babyName}",
      dialogSubtitle:
        "Envía este enlace o muestra el código QR a familiares y amigos. Ellos solo podrán reservar regalos — no verán este panel.",
      copyButton: "Copiar enlace",
      copiedButton: "¡Copiado!",
      qrHint: "Escanea para abrir la lista en un móvil",
      friendsWarning:
        "No compartas esta ventana ni tu enlace de edición — solo el enlace para compartir de arriba.",
    },
    addItem: {
      title: "Añade un regalo a la lista",
      titleLabel: "Nombre del artículo",
      titlePlaceholder: "p. ej. Silla de coche",
      urlLabel: "Enlace del producto",
      urlPlaceholder: "https://tienda.com/producto",
      noteLabel: "Nota (opcional)",
      notePlaceholder: "p. ej. talla 3-6m, cualquier color",
      priceLabel: "Precio (opcional)",
      pricePlaceholder: "p. ej. 45 €",
      submit: "Añadir a la lista",
      submitting: "Añadiendo…",
      errors: {
        title: "Introduce un nombre de artículo (2–120 caracteres).",
        url: "Añade un enlace válido al producto (debe empezar por http:// o https://).",
        generic: "No se pudo añadir el artículo. Inténtalo de nuevo.",
      },
      added: "¡Añadido a la lista!",
      fetchingPreview: "Obteniendo datos del producto…",
      previewReady: "Producto encontrado — nombre, precio y foto rellenados.",
      previewError: "No se pudo obtener una vista previa de ese enlace.",
    },
    items: {
      title: "Artículos en la lista ({count})",
      emptyTitle: "La lista todavía está vacía",
      emptyBody: "Añade tu primer regalo arriba para empezar.",
      reservedBy: "Reservado",
      notReserved: "Disponible",
      purchasedBadge: "Comprado",
      markPurchasedButton: "Marcar como comprado",
      undoPurchaseButton: "Deshacer compra",
      removeButton: "Eliminar",
      removeConfirmTitle: "¿Eliminar este artículo?",
      removeConfirmBody:
        "Esta acción no se puede deshacer. El artículo también desaparecerá de la lista que ven tus amigos.",
      cancelReservationButton: "Deshacer reserva",
      cancelReservationConfirmTitle: "¿Deshacer esta reserva?",
      cancelReservationConfirmBody:
        "El artículo volverá a estar disponible para todos los que tengan el enlace.",
      sections: {
        available: "Disponible ({count})",
        reserved: "Reservado ({count})",
        purchased: "Comprado ({count})",
      },
    },
    editLinkWarning:
      "Este enlace da control total sobre la lista — no lo compartas con nadie más que contigo misma.",
  },
  list: {
    header: {
      title: "Lista de deseos de {babyName}",
      subtitle:
        "Toca «Reservar» para avisar a los demás de que ya te has ocupado de este regalo.",
    },
    sections: {
      available: "Disponible ({count})",
      reserved: "Reservado ({count})",
    },
    item: {
      reserveButton: "Reservar",
      reservedBadge: "Reservado",
    },
    reserveDialog: {
      title: "Confirma tu reserva",
      body: "Esta reserva es anónima — los padres y otros invitados solo verán que el regalo está ocupado, no quién lo reservó. No podrás deshacerla tú misma; si cambias de opinión, pide a los padres que la liberen.",
      confirm: "Sí, reservar",
      submitting: "Reservando…",
      cancel: "Cancelar",
      warning: "Una vez confirmado, este regalo ya no estará disponible para los demás.",
    },
    errors: {
      alreadyReserved: "Vaya, alguien más acaba de reservar este regalo antes que tú.",
      generic: "No se pudo completar la reserva. Inténtalo de nuevo.",
    },
    empty: {
      title: "La lista todavía está vacía",
      body: "Los padres aún no han añadido ningún regalo — vuelve más tarde.",
    },
    footer: "Creado con Little One",
  },
  notFound: {
    title: "Lista no encontrada",
    body: "Este enlace no es válido o la lista ha caducado (los enlaces permanecen activos 6 meses).",
  },
};

export default es;
