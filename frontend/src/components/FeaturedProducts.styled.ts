import styled from "styled-components"

export const FeaturedSection = styled.section`
  margin-bottom: 3rem;
`

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

export const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
  font-size: 1.1rem;
  background-color: #ffeaea;
  border-radius: 8px;
  border: 1px solid #e74c3c;
`

