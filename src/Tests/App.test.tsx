import { App } from '../App'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { expect, test } from 'vitest'

test("rendu de L'app à l'état initial", () => {
    render(<App />);
    expect(screen.getByRole("heading", {name: "Recherche de Trackers"})).toBeInTheDocument();
    expect(screen.getByText(/Gestion des Trackers/i)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /Nouveau Tracker/i})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Liste des trackers"})).toBeInTheDocument();
    expect(screen.getByText(/musculation/i)).toBeInTheDocument();
    expect(screen.getByText("coding session")).toBeInTheDocument();
    expect(screen.getByText(/terminator/i)).toBeInTheDocument();
    expect(screen.getByText(/redux documentation/i)).toBeInTheDocument();
})
test("Ajouter un tracker", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.queryByText("Lecture")).not.toBeInTheDocument();
    expect(screen.getByRole("button", {name: /Nouveau Tracker/i})).toBeInTheDocument();
    await user.click(screen.getByRole("button", {name: /Nouveau Tracker/i}));
    const name = screen.getByPlaceholderText("tracker name...");
    const category: HTMLSelectElement = screen.getByLabelText("Categorie:");
    await user.type(name, "Lecture");
    await user.selectOptions(category, ["Perso"]);
    expect(category.value).toBe("Perso");
    await user.click(screen.getByRole("button", {name: /Ajouter/i}));
    expect(screen.getByText("Lecture")).toBeInTheDocument();

});
test("Suprimmer un tracker", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByText(/terminator/i).parentElement!);
    const category: HTMLSelectElement = screen.getByLabelText("Categorie:");
    const name: HTMLInputElement = screen.getByPlaceholderText("tracker name...");
    const starttime: HTMLInputElement = screen.getByLabelText("Date de début :");
    expect(category.value).toBe("Default");
    expect(name.value).toBe("terminator");
    expect(starttime.value).toStrictEqual("2021-08-01T16:40:01.000");
    await user.click(screen.getByRole("button", {name: /Supprimer/i}));
    expect(screen.queryByText("terminator")).not.toBeInTheDocument();      
});
test("Mettre à jour un tracker", async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText(/terminator/i).parentElement!);
    const name: HTMLInputElement = screen.getByPlaceholderText("tracker name...");
    const category: HTMLSelectElement = screen.getByLabelText("Categorie:");
    const FirstDate: HTMLInputElement = screen.getByLabelText("Date de début :");
    const EndDate: HTMLInputElement = screen.getByLabelText("Date de fin :");
    await user.clear(name);
    await user.type(name , "Protector");
    await user.selectOptions(category, ["Sport"]);
    await user.clear(FirstDate);
    await user.type(FirstDate, "2023-09-06T18:23:26");
    await user.clear(EndDate);
    await user.type(EndDate, "2023-09-06T20:01:12");
    expect(name.value).toBe("Protector");
    expect(FirstDate.value).toStrictEqual("2023-09-06T18:23:26.000");
    expect(EndDate.value).toStrictEqual("2023-09-06T20:01:12.000");
    expect(category.value).toBe("Sport");
});
test("filtrer un tracker via la barre de recherche", async () => {
    const user = userEvent.setup()
    render(<App />)
    const search = screen.getByPlaceholderText("libéllé du tracker")
    expect(search).toBeInTheDocument();
    await user.type(search, "musculation")
    expect(screen.queryByText("Documentation")).not.toBeInTheDocument();
    expect(screen.getByText("musculation")).toBeInTheDocument();
    await user.clear(search);
    await user.type(search, "terminator");
    expect(screen.getByText("terminator")).toBeInTheDocument();
    expect(screen.queryByText("musculation")).not.toBeInTheDocument();
    expect(screen.queryByText("Documentation")).not.toBeInTheDocument();
    await user.clear(search);
    expect(screen.getByText("musculation")).toBeInTheDocument();
    expect(screen.getByText("Documentation")).toBeInTheDocument();
});
test("tracker sauvegarder dans le localstorage", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.queryByText("Lecture")).not.toBeInTheDocument();
    expect(screen.getByRole("button", {name: /Nouveau Tracker/i})).toBeInTheDocument();
    await user.click(screen.getByRole("button", {name: /Nouveau Tracker/i}));
    const name = screen.getByPlaceholderText("tracker name...");
    const category: HTMLSelectElement = screen.getByLabelText("Categorie:");
    await user.type(name, "Lecture");
    await user.selectOptions(category, ["Perso"]);
    expect(category.value).toBe("Perso");
    await user.click(screen.getByRole("button", {name: /Ajouter/i}));
    expect(screen.getByText("Lecture")).toBeInTheDocument(); 
    await user.click(screen.getByRole("button", {name: /Nouveau Tracker/i}));
    await user.type(name, "Jardinage");
    await user.selectOptions(category, ["Perso"]);
    await user.click(screen.getByRole("button", {name: /Ajouter/i}));
    expect(screen.getByText("Jardinage")).toBeInTheDocument();
    act(() => {
        let titre: HTMLHeadElement = global.document.getElementById("Title")!;
        titre.addEventListener("click", () => {
            global.location.reload();
        })
    })
    expect(screen.getByText("Lecture")).toBeInTheDocument();
    expect(screen.getByText("Jardinage")).toBeInTheDocument();    
});
