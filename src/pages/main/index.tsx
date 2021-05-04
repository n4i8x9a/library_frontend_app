import React, {useEffect, useState} from 'react';
import {connectElem} from "../../reducers";
import {updateTitleAction} from "../../actions/app";
import {useTranslation} from "react-i18next";
import BookCard from "../../components/BookCard";
import {SearchBox} from '@fluentui/react/lib/SearchBox';
import {Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles} from '@fluentui/react/lib/Dropdown';
import {on} from "cluster";

interface MainProps {
    state: any,
    dispatch: any
}

function Main(props: MainProps) {
    const {t, i18n} = useTranslation('common');
    const [search, setSearch] = useState('')
    useEffect(() => {
        props.dispatch(updateTitleAction(t('mainPage.header')));
    }, [props.state.appReducer.title])

    let authors = [],publishers=[],years=[];
    for (let book of props.state.bookReducer.books) {
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


    let elArr = [];
    let key = 1;
    for (let book of props.state.bookReducer.books) {
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

            elArr.push(
                // @ts-ignore
                <BookCard key={key} book={book}/>
            );
            key++;
        }
    }

    return (
        <>
            <div className={'main_page'}>
                <div>

                    <SearchBox placeholder="Search" onSearch={newValue => setSearch(newValue)}/>

                    <Dropdown
                        placeholder="Select authors"
                        label=""
                        selectedKeys={selectedAuthors}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-ignore
                        onChange={onChangeAuthors}
                        multiSelect
                        options={authors}

                    />

                    <Dropdown
                        placeholder="Select publishers"
                        label=""
                        selectedKeys={selectedPublishers}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-ignore
                        onChange={onChangePublishers}
                        multiSelect
                        options={publishers}

                    />

                    <Dropdown
                        placeholder="Select years"
                        label=""
                        selectedKeys={selectedYears}
                        // eslint-disable-next-line react/jsx-no-bind
                        // @ts-ignore
                        onChange={onChangeYears}
                        multiSelect
                        options={years}

                    />

                </div>
                <div className={'cont'}>
                    {elArr}

                </div>


            </div>
        </>
    );

}

export default connectElem(Main);