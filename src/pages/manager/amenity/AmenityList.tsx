import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faEdit, faEraser, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AmenityDetail from "./AmenityDetail";
import axios from "axios";

const AmenityList = () => {
    const [data, setData] = useState<any[]>([]);
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [pageInfo, setPageInfo] = useState<any>({});
    const [pageSizeList, setPageSizeList] = useState<number[]>([5, 10, 20, 50, 100]);
    const [size, setSize] = useState<number>(5);
    const [pageLimit, setPageLimit] = useState<number>(3);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState<any>({});

    useEffect(() => {
        searchData();
    }, [size, currentPage]);

    const searchData = async () => {
        const filter: any = {
            keyword: keyword,
            page: currentPage,
            size: size,
            sortBy: 'name',
            order: 'asc'
        }

        try {
            const response = await axios.get('http://localhost:8080/api/amenities/search', { params: filter });
            setData(response.data.data);
            setPageInfo(response.data.page);
            setSize(response.data.page.size);
            setCurrentPage(response.data.page.number);
            console.log('PageInfo: ', response.data.page);
        } catch (error) {
            console.log('Failed to fetch data', error);
        }
    };

    const onCreate = () => {
        setIsShowDetail(true);
        setSelectedItem(null);

    };

    const onSearch = (event: any) => {
        event.preventDefault();
        searchData();
    };

    const onReset = (event: any) => {
        event.preventDefault();
        setKeyword('');
    }

    const onEdit = (item: any) => {
        setIsShowDetail(true);
        setSelectedItem(item);
    }

    const onDelete = async (item: any) => {
        try {
            const response = await fetch(`http://localhost:8080/api/amenities/${item.id}`, { method: 'DELETE' });
            const data = await response.json();
            if (data) {
                searchData();
            } else {
                console.log('Failed to delete data', data);
            }
        } catch (error) {
            console.log('Failed to delete data', error);
        }
    }

    const handleChange = (event: any) => {
        setKeyword(event.target.value);
    }

    const calculatePageList = () => {
        const start = Math.max(0, pageInfo.number - pageLimit);
        const end = Math.min(pageInfo.totalPages, pageInfo.number + pageLimit + 1);

        let pageList = [];
        for (let i = start; i < end; i++) {
            pageList.push(i);
        }
        return pageList;
    };
    return (
        <section>
            {/* Search Header */}
            <div className="card border border-slate-300 rounded-md">
                <div className="card-header p-3">
                    <h1 className="text-2xl font-bold">Amenity Management</h1>
                </div>
                <form onSubmit={onSearch} onReset={onReset}>
                    <div className="card-body border-y border-slate-300 p-3">
                        <div className="form-group mb-3">
                            <label htmlFor="keyword" className="block mb-2">Keyword</label>
                            <input type="text" id="keyword" name="keyword" onChange={(event: any) => handleChange(event)} value={keyword}
                                className="p-2 w-full border border-slate-300 rounded-sm" />
                        </div>
                    </div>
                    <div className="card-footer p-3 flex justify-between">
                        <button type="button" className="p-2 px-4 bg-green-500 rounded-full text-white hover:bg-green-700" onClick={onCreate}>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add
                        </button>
                        <div className="search-actions space-x-3">
                            <button type="reset" className="p-2 px-4 bg-slate-200 rounded-full hover:bg-slate-300">
                                <FontAwesomeIcon icon={faEraser} className="mr-2" /> Reset
                            </button>
                            <button type="submit" className="p-2 px-4 bg-blue-500 rounded-full text-white hover:bg-blue-700">
                                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Table List Data */}
            <div className="card border border-slate-300 rounded-md my-3">
                <div className="card-body border-y border-slate-300 p-3">
                    <table className="w-full">
                        <thead>
                            <tr className="*:border *:border-slate-300 *:p-2">
                                <th>No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? data.map((item, index) => (
                                <tr key={item.id} className="*:border *:border-slate-300 *:p-2">
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button type="button" title="Edit" onClick={() => onEdit(item)}>
                                            <FontAwesomeIcon icon={faEdit} className="text-blue-500 mr-2" />
                                        </button>
                                        <button type="button" title="Delete" onClick={() => onDelete(item)}>
                                            <FontAwesomeIcon icon={faTrash} className="text-red-500 mr-2" />
                                        </button>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan={4} className="border border-slate-300 p-2 text-center">No data</td></tr>}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer pagination p-3 flex justify-between items-center">
                    {/* Change Page Size */}
                    <div className="select-pagesize flex items-center">
                        <label htmlFor="pageSize" className="mr-2">Items Per Page:</label>
                        <select name="pageSize" id="pageSize" className="p-2 border border-slate-300 rounded-sm" onChange={(event: any) => setSize(event.target.value)} value={size}>
                            {pageSizeList.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    {/* Page List */}
                    <div className="page-list flex space-x-2 justify-center items-center">
                        <button onClick={() => setCurrentPage(0)}
                            className={`w-10 h-10 border border-blue-500 rounded-full ${pageInfo.number === 0 ? 'cursor-not-allowed pointer-events-none text-slate-300' : 'hover:bg-blue-500 hover:text-white'}`}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </button>
                        <button onClick={() => setCurrentPage(currentPage - 1)}
                            className={`w-10 h-10 border border-blue-500 rounded-full ${pageInfo.number === 0 ? 'cursor-not-allowed pointer-events-none text-slate-300' : 'hover:bg-blue-500 hover:text-white'}`}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>

                        {calculatePageList().map((item, index) => (
                            <button key={index} onClick={() => setCurrentPage(item)}
                                className={`w-10 h-10 border border-blue-500 rounded-full ${pageInfo.number === item ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}>
                                {item + 1}
                            </button>
                        ))}

                        <button onClick={() => setCurrentPage(currentPage + 1)}
                            className={`w-10 h-10 border border-blue-500 rounded-full ${pageInfo.number === pageInfo.totalPages - 1 ? 'cursor-not-allowed pointer-events-none text-slate-300' : 'hover:bg-blue-500 hover:text-white'}`}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button onClick={() => setCurrentPage(pageInfo.totalPages - 1)}
                            className={`w-10 h-10 border border-blue-500 rounded-full ${pageInfo.number === pageInfo.totalPages - 1 ? 'cursor-not-allowed pointer-events-none text-slate-300' : 'hover:bg-blue-500 hover:text-white'}`}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button>
                    </div>
                    {/* Page Details */}
                    <div className="page-detail">
                        1-10 of 100
                    </div>
                </div>
            </div>

            {/* Form Details - Edit/Create Amenity */}
            {isShowDetail && <AmenityDetail item={selectedItem} />}
        </section>
    );
}

export default AmenityList;