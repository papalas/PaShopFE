// src/hooks/useBasket.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { OrderControllerService, BasketItemDto, OrderDto } from '../api';

export function useBasket() {
  const queryClient = useQueryClient();

  const {
    data: basket,
    isLoading,
    error,
  } = useQuery<OrderDto, Error>('basket', OrderControllerService.listBasket);

  const addItemMutation = useMutation(
    (item: BasketItemDto) => OrderControllerService.addItemToBasket(item),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('basket');
      },
    },
  );

  const removeItemMutation = useMutation(
    (item: BasketItemDto) => OrderControllerService.removeItemFromBasket(item),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('basket');
      },
    },
  );

  const payBasketMutation = useMutation(OrderControllerService.payBasket, {
    onSuccess: () => {
      queryClient.invalidateQueries('basket');
    },
  });

  return {
    basket,
    isLoading,
    error,
    addItem: addItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    payBasket: payBasketMutation.mutate,
  };
}
