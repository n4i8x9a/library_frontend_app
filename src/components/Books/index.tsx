import React, {useState} from 'react';
import {connectElem} from "../../reducers";
import {Dropdown, IDropdownOption, IDropdownStyles} from "@fluentui/react/lib/Dropdown";
import {useTranslation} from "react-i18next";
import BookCard from "../BookCard";
import {SearchBox} from "@fluentui/react/lib/SearchBox";
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import {DefaultButton} from "@fluentui/react";


interface BooksProps
{
    state: any,
    dispatch: any,
    books:any
}


function Books(props:BooksProps)
{
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 150 } };


    const {t, i18n} = useTranslation('common');
    const [search, setSearch] = useState('')


    const TitleSort = [

        { key: 'az', text: 'A-Z' },
        { key: 'za', text: 'Z-A' },

    ];
    const yearsSort=[
        { key: 'asc', text: 'Ascending' },
        { key: 'desc', text: 'Descending' },

    ]
    const ratingSort=[
        { key: 'asc', text: 'Ascending' },
        { key: 'desc', text: 'Descending' },

    ]
    const [selectedTitleSort, setSelectedTitleSort] = React.useState<IDropdownOption>();
    const [selectedYearsSort, setSelectedYearsSort] = React.useState<IDropdownOption>();
    const [selectedRatingSort, setSelectedRatingSort] = React.useState<IDropdownOption>();
    const onChangeTitleSort = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setSelectedTitleSort(item);
    };
    const onChangeYearsSort = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setSelectedYearsSort(item);
    };

    const onChangeRatingSort = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        setSelectedRatingSort(item);
    };








    let authors = [],publishers=[],years=[];
    for (let book of props.books) {
        if (authors.find((item: any, index: any) => {
            if (item.key === book.author) {
                return true;
            }
        }) === undefined) {
            authors.push({key: book.author, text: book.author})
        }

        if (publishers.find((item: any, index: any) => {
            if (item.key === book.publisher) {
                return true;
            }
        }) === undefined) {
            publishers.push({key: book.publisher, text: book.publisher})
        }

        if (years.find((item: any, index: any) => {
            if (item.key === book.year) {
                return true;
            }
        }) === undefined) {
            years.push({key: book.year, text: book.year})
        }

    }
    const [selectedAuthors, setSelectedAuthors] = React.useState<string[]>([]);
    const [selectedPublishers, setSelectedPublishers] = React.useState<string[]>([]);
    const [selectedYears, setSelectedYears] = React.useState<number[]>([]);

    const onChangeAuthors = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        if (item) {
            setSelectedAuthors(
                item.selected ? [...selectedAuthors, item.key as string] : selectedAuthors.filter(key => key !== item.key),
            );
        }
    };

    const onChangePublishers = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        if (item) {
            setSelectedPublishers(
                item.selected ? [...selectedPublishers, item.key as string] : selectedPublishers.filter(key => key !== item.key),
            );
        }
    };

    const onChangeYears = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        if (item) {
            setSelectedYears(
                item.selected ? [...selectedYears, item.key as number] : selectedYears.filter(key => key !== item.key),
            );
        }
    };
    let h=props.state.appReducer.windowSize.height,w=props.state.appReducer.windowSize.width;

    let bookArr=[],elArr = [];
    let key = 1;
    for (let book of props.books) {
        if (!(selectedAuthors.length === 0 || selectedAuthors.find((item: any, index: any) => {
            if (item === book.author) {
                return true;
            }
        })!==undefined)) {
            continue;
        }

        if (!(selectedYears.length === 0 || selectedYears.find((item: any, index: any) => {
            if (item === book.year) {
                return true;
            }
        })!==undefined)) {
            continue;
        }

        if (!(selectedPublishers.length === 0 || selectedPublishers.find((item: any, index: any) => {
            if (item === book.publisher) {
                return true;
            }
        })!==undefined)) {
            continue;
        }


        if (search === '' || book.title.toLowerCase().includes(search.toLowerCase())) {

            bookArr.push(book);


        }
    }

    if (selectedTitleSort!==undefined)
    {
        bookArr.sort(function(a, b){
            let nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
            if (nameA < nameB) //сортируем строки по возрастанию
            {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0 // Никакой сортировки
        })

        if (selectedTitleSort.key==='za')
        {
            bookArr.reverse();
        }
    }

    if (selectedYearsSort!==undefined)
    {
        bookArr.sort(function(a, b){
            return a.year-b.year;
        })

        if (selectedYearsSort.key==='desc')
        {
            bookArr.reverse();
        }
    }

    if (selectedRatingSort!==undefined)
    {
        bookArr.sort(function(a, b){
            return a.rating-b.rating;
        })

        if (selectedRatingSort.key==='desc')
        {
            bookArr.reverse();
        }
    }


    for (let book of bookArr)
    {
        elArr.push(
            // @ts-ignore
            <BookCard key={key}  book={book}/>
        );
        key++;
    }
    return (
        <>
            <div className={'main_page'}>
                { h<w &&
                ((h/w)>(2/3) || (h>650 && w>1100) ) ||
                (h/w)<(280/653)   ?
                    <div className={'search_box'}>

                        <SearchBox placeholder="Search" onSearch={newValue => setSearch(newValue)}/>
                        <div className={'philters_box'}>
                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                placeholder="Select authors"
                                label=""
                                selectedKeys={selectedAuthors}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeAuthors}
                                multiSelect
                                options={authors}
                                styles={dropdownStyles}

                            />

                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                placeholder="Select publishers"
                                label=""
                                selectedKeys={selectedPublishers}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangePublishers}
                                multiSelect
                                options={publishers}
                                styles={dropdownStyles}


                            />

                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                placeholder="Select years"
                                label=""
                                selectedKeys={selectedYears}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeYears}
                                multiSelect
                                options={years}
                                styles={dropdownStyles}


                            />


                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                label=""
                                selectedKey={selectedTitleSort ? selectedTitleSort.key : undefined}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeTitleSort}
                                placeholder="Title Sort"
                                options={TitleSort}
                                styles={dropdownStyles}

                            />
                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                label=""
                                selectedKey={selectedYearsSort ? selectedYearsSort.key : undefined}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeYearsSort}
                                placeholder="Years Sort"
                                options={yearsSort}
                                styles={dropdownStyles}

                            />

                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                label=""
                                selectedKey={selectedRatingSort ? selectedRatingSort.key : undefined}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeRatingSort}
                                placeholder="Rating Sort"
                                options={ratingSort}
                                styles={dropdownStyles}

                            />
                        </div>
                    </div> :
                    <DefaultButton text="Open panel" onClick={openPanel} />
                }
                <div className={'cont'}>
                    {elArr}

                </div>

                <Panel
                    headerText="Sample panel"
                    isOpen={isOpen}
                    onDismiss={dismissPanel}
                    // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
                    closeButtonAriaLabel="Close"
                >
                    <div className={'search_box'}>

                        <SearchBox placeholder="Search" onSearch={newValue => setSearch(newValue)}/>
                        <div className={'philters_box'}>
                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                placeholder="Select authors"
                                label=""
                                selectedKeys={selectedAuthors}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeAuthors}
                                multiSelect
                                options={authors}
                                styles={dropdownStyles}

                            />

                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                placeholder="Select publishers"
                                label=""
                                selectedKeys={selectedPublishers}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangePublishers}
                                multiSelect
                                options={publishers}
                                styles={dropdownStyles}


                            />

                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                placeholder="Select years"
                                label=""
                                selectedKeys={selectedYears}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeYears}
                                multiSelect
                                options={years}
                                styles={dropdownStyles}


                            />


                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                label=""
                                selectedKey={selectedTitleSort ? selectedTitleSort.key : undefined}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeTitleSort}
                                placeholder="Title Sort"
                                options={TitleSort}
                                styles={dropdownStyles}

                            />
                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                label=""
                                selectedKey={selectedYearsSort ? selectedYearsSort.key : undefined}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeYearsSort}
                                placeholder="Years Sort"
                                options={yearsSort}
                                styles={dropdownStyles}

                            />

                            <Dropdown
                                style={{margin: "1% 0.5%"}}
                                label=""
                                selectedKey={selectedRatingSort ? selectedRatingSort.key : undefined}
                                // eslint-disable-next-line react/jsx-no-bind
                                // @ts-ignore
                                onChange={onChangeRatingSort}
                                placeholder="Rating Sort"
                                options={ratingSort}
                                styles={dropdownStyles}

                            />
                        </div>
                    </div>
                </Panel>
            </div>
        </>
    );

}

export default connectElem(Books);