export const getPagination = (
  totalData: number,
  perPage: number,
  currentPage: number
) => {
  // 1.2 = 1 page ===== Math.floor : gives 1st page
  //1.2 = 2 Math.ceiling ====== gives 2nd page
  const totalPages = Math.ceil(totalData / perPage); //gives the total pages

  // total page : 3
  //currentPage : 2 cha vane goes to 3 cause +1 garyo
  // next page is 2 , 3 ,4 or +1 hune ho ,
  const nextPage = totalPages > currentPage ? currentPage + 1 : null;
  //currentPage : 1 cha vane
  //currentPage : 2 cha vane goes to 1 cause -1 garyo
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    totalData,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage: totalPages > currentPage, //for frontend easiness
    hasprevPage: currentPage > 1,
  };
};
