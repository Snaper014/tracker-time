import * as React from 'react';
import { TrackerCategory } from '../components/TrackerCategory';
import {render, screen, RenderOptions} from '@testing-library/react'
import '@testing-library/jest-dom'
import { expect, test } from 'vitest'

const Provider = ({children}: {children: React.ReactNode}) => {
    return (
        <table>
            <tbody>{children}</tbody>
        </table>
    )
}
const WrapperCustom = (
    ui: React.ReactElement, 
    options?: Omit<RenderOptions, 'wrapper'>,
    ) => render(ui, {wrapper: Provider, ...options});

test("Test function TrackerCategory", () => {
    const category = "Lecture";
    WrapperCustom(<TrackerCategory category={category}/>);
    expect(screen.getByText(category)).toBeInTheDocument();
});