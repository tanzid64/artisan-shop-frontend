import LogoIcon from "./logo-icon";

export const Logo = () => {
  return (
    <>
      <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        <LogoIcon className="size-5 fill-current text-white dark:text-black" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">
          Artisan Shop
        </span>
      </div>
    </>
  );
};
