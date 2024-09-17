import { useQuery } from 'react-query';
import { OrderControllerService, OrderDto } from '../api';

export function useOrders() {
  return useQuery<OrderDto[], Error>('orders', OrderControllerService.listOrders);
}
