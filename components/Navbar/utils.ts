export const userDownloadFile = (file: File) => {
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = URL.createObjectURL(file);
  link.download = file.name;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link && link.parentNode!.removeChild(link);
  }, 0);
};

export const toSingularCapitalised = (a: string) => {
  const singular = a.slice(0, a.length - 1);
  const firstUpper = singular.substring(0, 1).toUpperCase();
  return `${firstUpper}${singular.substring(1)}`;
};
