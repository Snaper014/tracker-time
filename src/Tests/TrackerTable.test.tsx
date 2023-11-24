import * as React from 'react';
import { TrackersTable } from '../components/TrackersTable';
import {render, renderHook, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import db from '../data';
import { Trackers } from '../type';
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest';


test("selection d'un tracker", async () => {
    const user = userEvent.setup()
    const IdTerminator = "3";
    const IdDocumentation = "4";
    const {result} = renderHook(() => {
        const [selectedTracker, onSelectedTracker] = React.useState<Trackers | undefined>();
        return {selectedTracker, onSelectedTracker}
    })
    render(<TrackersTable trackers={db} 
            selectedTracker={result.current.selectedTracker}
            onSelectedTracker={result.current.onSelectedTracker}
            />);      
    expect(screen.getByText(/terminator/i)).toBeInTheDocument();
    expect(screen.getByText(/redux documentation/i)).toBeInTheDocument();
    await user.click(screen.getByText(/terminator/i).parentElement!);
    expect(result?.current?.selectedTracker?.id).toStrictEqual(IdTerminator);
    await user.click(screen.getByText(/redux documentation/i).parentElement!);
    expect(result?.current?.selectedTracker?.id).toStrictEqual(IdDocumentation);
});
