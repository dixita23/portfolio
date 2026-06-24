// const flipBook = (elBook) => {
//   elBook.style.setProperty("--c", 0);

//   const pages = elBook.querySelectorAll(".page");
//   const totalPages = pages.length;

//   pages.forEach((page, idx) => {
//     page.style.setProperty("--i", idx);

//     page.addEventListener("click", (evt) => {
//       if (evt.target.closest("a")) return;

//       const current = Number(
//         getComputedStyle(elBook).getPropertyValue("--c")
//       );

//       // If book is fully open and user clicks the back cover
//       if (
//         current >= totalPages &&
//         evt.target.closest(".back")
//       ) {
//         elBook.style.setProperty("--c", 0);
//         return;
//       }

//       const curr = evt.target.closest(".back")
//         ? idx
//         : idx + 1;

//       elBook.style.setProperty("--c", curr);
//     });
//   });
// };

// document.querySelectorAll(".book").forEach(flipBook);


// const flipBook = (elBook) => {
//   elBook.style.setProperty("--c", 0);

//   const pages = elBook.querySelectorAll(".page");
//   const totalPages = pages.length;

//   const layout = document.querySelector("#bio-layout");
//   const image = document.querySelector(".bio-image");

//   pages.forEach((page, idx) => {
//     page.style.setProperty("--i", idx);

//     page.addEventListener("click", (evt) => {
//       if (evt.target.closest("a")) return;

//       const current = Number(
//         getComputedStyle(elBook).getPropertyValue("--c")
//       );

//       // Book fully open -> click back cover -> close book
//     //   if (
//     //     current >= totalPages &&
//     //     evt.target.closest(".back")
//     //   ) {
//     //     elBook.style.setProperty("--c", 0);

//     //     image?.classList.remove("hidden");
//     //     layout?.classList.remove("book-open");

//     //     return;
//     //   }

//     if (curr > 0) {
//   image?.classList.add("hidden");
//   layout?.classList.add("book-open");
// }

//       const curr = evt.target.closest(".back")
//         ? idx
//         : idx + 1;

//       elBook.style.setProperty("--c", curr);

//       // First page opened
//       if (curr > 0) {
//         image?.classList.add("hidden");
//         layout?.classList.add("book-open");
//       } else {
//         image?.classList.remove("hidden");
//         layout?.classList.remove("book-open");
//       }
//     });
//   });
// };

// document.querySelectorAll(".book").forEach(flipBook);


const flipBook = (elBook) => {
  elBook.style.setProperty("--c", 0);

  const pages = elBook.querySelectorAll(".page");
  const totalPages = pages.length;

  const layout = document.querySelector("#bio-layout");
  const image = document.querySelector(".bio-image");

  pages.forEach((page, idx) => {
    page.style.setProperty("--i", idx);

    page.addEventListener("click", (evt) => {
      if (evt.target.closest("a")) return;

      const current = Number(
        getComputedStyle(elBook).getPropertyValue("--c")
      );

      // If user is on back cover and clicks it again
      if (
        current >= totalPages &&
        evt.target.closest(".back")
      ) {
        elBook.style.setProperty("--c", 0);

        // show image after close animation finishes
        setTimeout(() => {
          image?.classList.remove("hidden");
          layout?.classList.remove("book-open");
        }, 1000);

        return;
      }

      const curr = evt.target.closest(".back")
        ? idx
        : idx + 1;

      elBook.style.setProperty("--c", curr);

      // Hide image only when opening the book for the first time
      if (current === 0 && curr === 1) {
        image?.classList.add("hidden");
        layout?.classList.add("book-open");
      }
    });
  });
};

document.querySelectorAll(".book").forEach(flipBook);