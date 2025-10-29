import styled from 'styled-components';

export const CartContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #2c3e50;
  }
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ecf0f1;
`;

export const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

export const CartItemInfo = styled.div`
  flex: 1;
`;

export const CartItemName = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const CartItemPrice = styled.div`
  color: #27ae60;
  font-weight: bold;
`;

export const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const QuantityButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

export const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    background-color: #c0392b;
  }
`;

export const CartTotal = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #2c3e50;
  text-align: right;

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin: 0;
  }
`;

export const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;
