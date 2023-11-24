import * as React from 'react';
import { FilterTrackers } from '../components/FilterTrackers';
import {render, renderHook, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { expect } from 'vitest';

test("Test function FilterTrackers", async () => {
    const user = userEvent.setup();
   const {result} =  renderHook(() => {
        const [value, setValue] = React.useState<undefined | string>();
        return {value, setValue}
    })
    const search = "Abracadabrantesque";
    const Test = (value: string) => result.current.setValue(value);
    render(<FilterTrackers onTextChange={Test} />)
    expect(screen.getByRole("heading", {name: "Recherche de Trackers"})).toBeInTheDocument();
    const SearchInput = screen.getByPlaceholderText("libéllé du tracker");
    expect(SearchInput).toBeInTheDocument();
    await user.type(SearchInput, search);
    expect(SearchInput).toHaveValue("Abracadabrantesque");
    expect(search).toBe(result.current.value);
});