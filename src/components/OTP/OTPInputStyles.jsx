import styled from "styled-components";

export const OTPContainer = styled.div`
  display: flex;
  justify-content: space-between;

  gap: 10px; /* Adjust the spacing as needed */
`;

export const OTPInputField = styled.input`
  width: 3rem; /* Equal width for each input field */
  height: 3rem; /* Equal height for each input field */
  border: none;
  outline: none;
  text-align: center;
  font-size: 1.5rem;
  background-color: #f0f0f0;
  color: #cd4269;
  border-radius: 0.8rem; /* Border radius of 0.8rem */

  /* Remove default focus styles */
  &:focus {
    outline: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    /* Responsive styles for smaller screens */
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.2rem;
  }
`;
export const SubmitButton = styled.button`
  background-color: #cd4269;
  border: none;
  border-radius: 0.8rem;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #ab3456; /* New hover color */
  }

  &:active {
    background-color: #873945; /* New clicked color */
  }
`;
