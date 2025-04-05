import { describe, it, expect, vi } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import QuantitySelector from './QuantitySelector';


const testQuantity = 10;

describe("Quantity selector display", () => {
    it("Displays default quantity as 1", () => {
        render(<QuantitySelector />);
        const quantityInput = screen.getByRole("textbox");
        expect(parseInt(quantityInput.value, 10)).toEqual(1);
    })

    it("Displays correct quantity when specified", () => {
        render(
            <QuantitySelector initQuantity={testQuantity} />
        );
        const quantityInput = screen.getByRole("textbox");
        expect(quantityInput.value).toEqual(testQuantity.toString());
    })
})

describe("Quantity selector buttons", () => {
    it("Prevents decrease button from being clicked when quantity is 1", () => {
        render(<QuantitySelector />);
        const decreaseButton = screen.getByRole("button", { name: "-" });
        expect(decreaseButton).toBeDisabled();
    })

    it("Prevents increase button from being clicked when quantity is equal to the maximal quantity", () => {
        render(
            <QuantitySelector
                initQuantity={testQuantity}
                maximum={testQuantity}
            />
        );
        const increaseButton = screen.getByRole("button", { name: "+" });
        expect(increaseButton).toBeDisabled();
    })

    it("Increases quantity by one when increase button is clicked", async () => {
        const user = userEvent.setup();

        render(<QuantitySelector initQuantity={testQuantity} />);
        const increaseButton = screen.getByRole("button", { name: "+" });
        const quantityInput = screen.getByRole("textbox");

        await user.click(increaseButton);
        expect(parseInt(quantityInput.value, 10)).toEqual(testQuantity + 1);
    })

    it("Decreases quantity by one when decrease button is clicked", async () => {
        const user = userEvent.setup();

        render(<QuantitySelector initQuantity={testQuantity} />);
        const decreaseButton = screen.getByRole("button", { name: "-" });
        const quantityInput = screen.getByRole("textbox");

        await user.click(decreaseButton);
        expect(parseInt(quantityInput.value, 10)).toEqual(testQuantity - 1);
    })
})

describe("Quantity selector input", () => {
    it("Changes quantity when valid number is entered", async () => {
        const user = userEvent.setup();

        render(<QuantitySelector initQuantity={testQuantity} />);
        const quantityInput = screen.getByRole("textbox");

        await user.type(quantityInput, "0")
        expect(quantityInput.value).toEqual(`${testQuantity}0`);
        await user.type(quantityInput, "{backspace}")
        expect(quantityInput.value).toEqual(`${testQuantity}`);
    })

    it("Ignores quantity change when non numeral is entered", async () => {
        const user = userEvent.setup();

        render(<QuantitySelector initQuantity={testQuantity} />);
        const quantityInput = screen.getByRole("textbox");

        await user.type(quantityInput, "abc")
        expect(quantityInput.value).toEqual(testQuantity.toString());
    })

    it("Allows user to fully clear input box and enter new value", async () => {
        const user = userEvent.setup();

        render(<QuantitySelector initQuantity={testQuantity} />);
        const quantityInput = screen.getByRole("textbox");

        await user.type(quantityInput, "{backspace}{backspace}999")
        expect(quantityInput.value).toEqual("999");
    })

    it("Ignores quantity change when 0 is entered while input is blank", async () => {
        const user = userEvent.setup();

        render(<QuantitySelector initQuantity={testQuantity} />);
        const quantityInput = screen.getByRole("textbox");

        await user.type(quantityInput, "{backspace}{backspace}000000000")
        expect(quantityInput.value).toEqual("");
    })

    it("Sets quantity to the maximum value when a number larger than the maximum value is entered", async () => {
        const user = userEvent.setup();

        render(
            <QuantitySelector
                initQuantity={testQuantity}
                maximum="99"
            />
        );
        const quantityInput = screen.getByRole("textbox");

        await user.type(quantityInput, "0")
        expect(quantityInput.value).toEqual("99");
    })

    it("Sets quantity to pre-edit value if input is blank when focus is lost", async () => {
        const user = userEvent.setup();

        render(<QuantitySelector initQuantity={testQuantity} />);
        const quantityInput = screen.getByRole("textbox");

        await user.type(quantityInput, "{backspace}{backspace}{tab}")
        expect(quantityInput.value).toEqual(testQuantity.toString());
        await user.type(quantityInput, "0{tab}{backspace}{backspace}{backspace}{tab}")
        expect(quantityInput.value).toEqual("100");
    })
})

describe("Quantity selector callback", () => {
    it("Calls callback function after a valid number is set", async () => {
        const callback = vi.fn();
        const user = userEvent.setup();

        render(<QuantitySelector callback={callback} maximum={99} />);
        const quantityInput = screen.getByRole("textbox");

        /* 
            INIT 1
            0    10 (call)
            BS   1  (call)
            BS   -
            0    -
            1    1  (call)
            0    10 (call)
            0    99 (call)
            0    99 (call)
            BS   9  (call)
            BS   -  
            TAB  1  (call)
        */
        await user.type(quantityInput, "0{backspace}{backspace}01000{backspace}{backspace}{tab}");
        expect(callback).toHaveBeenCalledTimes(8);
    })
})