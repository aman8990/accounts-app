'use client';

import { useForm, useWatch } from 'react-hook-form';
import DatePicker from '@/app/_components/DatePicker';
import { usePartyMasterStore } from '@/app/_store/partyMasterStore';
import { useLorryMasterStore } from '@/app/_store/lorryMasterStore';
import Button from '@/app/_components/Button';
import formattedDate from '@/app/_libs/formattedDate';
import { searchMemos } from '@/app/_actions/SearchMemos';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SpinnerMini from '@/app/_components/SpinnerMini';
import Table from './Table';
import Pagination from './Pagination';
import SelectController from '@/app/_components/SelectController';

function SearchFilters() {
  const [isSearching, setIsSearching] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchFilters, setSearchFilters] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 10;

  const partyMasters = usePartyMasterStore((state) => state.partyMasters);
  const lorryMasters = useLorryMasterStore((state) => state.lorryMasters);

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      dateType: 'all',
      fromDate: null,
      toDate: null,
      orderType: '',
      masterType: '',
      masterId: '',
    },
  });

  const dateType = useWatch({
    control,
    name: 'dateType',
  });

  const fromDate = useWatch({
    control,
    name: 'fromDate',
  });

  const toDate = useWatch({
    control,
    name: 'toDate',
  });

  const orderType = useWatch({
    control,
    name: 'orderType',
  });

  const masterType = useWatch({
    control,
    name: 'masterType',
  });

  const masterId = useWatch({
    control,
    name: 'masterId',
  });

  const dateTypeOptions = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'range',
      label: 'Range',
    },
  ];

  const orderTypeOptions = [
    {
      value: 'pending',
      label: 'Pending Orders',
    },
    {
      value: 'all',
      label: 'All Orders',
    },
  ];

  const masterTypeOptions = [
    {
      value: 'party',
      label: 'Party Master',
    },
    {
      value: 'lorry',
      label: 'Lorry Master',
    },
  ];

  const partyOptions = partyMasters.map((party) => ({
    value: party.id,
    label: party.full_name,
  }));

  const lorryOptions = lorryMasters.map((lorry) => ({
    value: lorry.id,
    label: lorry.owner_name,
  }));

  const showOrderType =
    dateType === 'all' || (dateType === 'range' && fromDate && toDate);

  const showMasterType = Boolean(orderType);

  const showSearch =
    masterType === 'all' ||
    (masterType === 'party' && masterId) ||
    (masterType === 'lorry' && masterId);

  const handleDateTypeChange = (value) => {
    setValue('dateType', value);

    setValue('fromDate', null);
    setValue('toDate', null);
    setValue('orderType', '');
    setValue('masterType', '');
    setValue('masterId', '');
  };

  const handleOrderTypeChange = (value) => {
    setValue('orderType', value);

    setValue('masterType', '');
    setValue('masterId', '');
  };

  const handleMasterTypeChange = (value) => {
    setValue('masterType', value);

    setValue('masterId', '');
  };

  const handleMasterIdChange = (value) => {
    setValue('masterId', value);
  };

  const fetchMemos = async (filters, page) => {
    try {
      setIsSearching(true);

      const result = await searchMemos(filters, page, pageSize);

      if (!result?.success) {
        toast.dismiss();

        toast.error(result?.error || 'Error in fetching Memos');

        return;
      }

      setOrders(result.data || []);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);

      toast.dismiss();
      toast.success('Success');
    } catch (error) {
      console.error('fetchMemos error:', error);
      toast.dismiss();
      toast.error('Something went wrong while fetching memos.');
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = async (data) => {
    if (data.dateType === 'range') {
      if (!data.fromDate || !data.toDate) {
        toast.error('Please select both From and To dates.');
        return;
      }

      if (new Date(data.toDate) <= new Date(data.fromDate)) {
        toast.error('To date must be greater than From date.');
        return;
      }
    }

    setIsSearching(true);

    const searchData = {
      dateType: data.dateType,
      fromDate: data.dateType === 'range' ? formattedDate(data.fromDate) : null,
      toDate: data.dateType === 'range' ? formattedDate(data.toDate) : null,
      orderType: data.orderType,
      masterType: data.masterType,
      masterId: data.masterId,
    };

    setSearchFilters(searchData);
    setCurrentPage(1);

    await fetchMemos(searchData, 1);
  };

  const handlePageChange = async (page) => {
    if (!searchFilters) return;

    await fetchMemos(searchFilters, page);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-5 mb-10"
      >
        <div>
          <div className="flex gap-10 mx-10">
            <SelectController
              label="Date Type"
              name="dateType"
              control={control}
              newOptions={dateTypeOptions}
              handleChange={handleDateTypeChange}
              placeholder="Select date type"
            />

            {dateType === 'range' && (
              <div className="flex gap-10">
                <DatePicker control={control} name="fromDate" label="From" />
                <DatePicker control={control} name="toDate" label="To" />
              </div>
            )}

            {showOrderType && (
              <SelectController
                label="Order Type"
                name="orderType"
                newOptions={orderTypeOptions}
                control={control}
                handleChange={handleOrderTypeChange}
                placeholder="Select Orders Type"
              />
            )}

            {showMasterType && (
              <SelectController
                label="Master Type"
                name="masterType"
                newOptions={masterTypeOptions}
                control={control}
                handleChange={handleMasterTypeChange}
                placeholder="Select Master Type"
              />
            )}
          </div>

          {masterType === 'party' && (
            <SelectController
              label="Party Master"
              name="masterId"
              newOptions={partyOptions}
              control={control}
              handleChange={handleMasterIdChange}
              placeholder="Select Master"
              isSearchable={true}
              bigInput={true}
            />
          )}

          {masterType === 'lorry' && (
            <SelectController
              label="Lorry Master"
              name="masterId"
              newOptions={lorryOptions}
              control={control}
              handleChange={handleMasterIdChange}
              placeholder="Select Master"
              isSearchable={true}
              bigInput={true}
            />
          )}

          {showSearch && (
            <div className="flex justify-center mt-8">
              <div className="w-60">
                <Button>{isSearching ? <SpinnerMini /> : 'Search'}</Button>
              </div>
            </div>
          )}
        </div>
      </form>

      {orders && (
        <Table orders={orders} masterType={searchFilters?.masterType} />
      )}
      {orders && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default SearchFilters;
