import { useEffect, useState } from "react";
import { Button, Card, Input } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { getAllProductsThunk } from "../../store/features/product.features";

export default function SearchView() {
  const dispatch = useAppDispatch();

  const [page] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy] = useState("createdAt");
  const [sortOrder] = useState<"asc" | "desc">("asc");

  const boneCard = () => {
    const cardItem = [];
    for (let i = 0; i < 10; i++) {
      cardItem.push(
        <div
          key={i}
          className="h-48 w-full bg-foreground/20 rounded-2xl "
        ></div>,
      );
    }
    return cardItem;
  };

  const { isLoading, isSuccess, data } = useAppSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(getAllProductsThunk({ page, limit, search, sortBy, sortOrder }));
  }, [dispatch, page, limit, search, sortBy, sortOrder]);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-foreground font-bold text-2xl"> Search Product </h1>
      <Input
        type="search"
        placeholder="Search Product Here..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boneCard()}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isSuccess && data?.data.length !== 0 ? (
            data?.data.map((item) => (
              <Card key={item.id}>
                <div className="flex h-48 flex-col justify-between">
                  <span className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-foreground">
                      {item.name}
                    </h1>
                    <h2 className="text-primary font-bold"> {item.price}$ </h2>
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                  <h5 className="text-secondary text-sm font-bold">
                    {item.user.name} - {item.user.email}
                  </h5>
                  <span className="flex justify-between items-center">
                    <h1
                      className={
                        item.quantity < 10
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }
                    >
                      {item.quantity} unit
                    </h1>
                    <Button onClick={() => alert({ userId: item.userId })}>
                      BUY
                    </Button>
                  </span>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-2xl font-bold lg:col-span-3 md:col-span-1 flex items-center justify-center w-full h-48">
              <h1>no product found</h1>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
