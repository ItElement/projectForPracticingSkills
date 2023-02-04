
type Mods = Record<string, boolean | string>


// принимает главный класс, объект с модами, массив дополнительных классов
export function classNames(cls:string, mods: Mods, additional: string[]): string {

    return [
        cls,
        ...additional,
        // entries позволяет получить как ключь, так и значение
        ...Object.entries(mods)
            // в массиве оставляем только данные со значением true
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className)
    ]
        .join(' ');
}

classNames('remove-btn', {hovered: true, selectable: true, red: false}, ['pdg'])