import has from 'lodash/has';
import get from 'lodash/get';

export function objectQuery<T = {}>(query: Partial<Record<string, string | string[]>>, data: Readonly<T[]> | T[]) {
  let result = [...data],
    pagination: Pagination = {};

  let q = query.q,
    _start = query._start as string | number,
    _end = query._end as string | number,
    _page = query._page as string | number,
    _sort = query._sort as string,
    _order = query._order as string,
    _limit = query._limit as string | number,
    _select = query._select as string;

  // Remove q, _start, _end, ...etc from query
  // To avoid filtering using those parameter
  delete query.q;
  delete query._start;
  delete query._end;
  delete query._sort;
  delete query._order;
  delete query._limit;

  Object.keys(query).forEach((qVal) => {
    for (const i in result) {
      if (
        has(result[i], qVal) ||
        qVal === '_' ||
        /_lte$/.test(qVal) ||
        /_gte$/.test(qVal) ||
        /_ne$/.test(qVal) ||
        /_like$/.test(qVal)
      )
        return;
    }
    delete query[qVal];
  });

  // Full-text search by combining all values
  // Of each object prop in the array
  if (q) {
    if (Array.isArray(q)) q = q[0];
    else q = q.toLowerCase();

    result = result.filter((item) => {
      let vals = '';
      for (const key in item) {
        if (typeof item[key] === 'string' || typeof item[key] === 'number') {
          vals += item[key] + ' ';
        }
      }
      return new RegExp(q as string, 'gi').test(vals);
    });
  }

  Object.keys(query).forEach((key) => {
    if (key !== 'callback' && key !== '_') {
      const arr = (() => {
        const qVal = query[key];
        if (!qVal) return [];
        if (Array.isArray(qVal)) return qVal;
        return [qVal];
      })();

      const isDifferent = /_ne$/.test(key);
      const isRange = /_lte$/.test(key) || /_gte$/.test(key);
      const isLike = /_like$/.test(key);
      const path = key.replace(/(_lte|_gte|_ne|_like)$/, '');

      result = result.filter((element) => {
        return arr
          .map(function (value) {
            // get item value based on path
            // i.e post.title -> 'foo'
            const elementValue = get(element, path);

            // Prevent toString() failing on undefined or null values
            if (elementValue === undefined || elementValue === null) return undefined;

            if (isRange) {
              const isLowerThan = /_gte$/.test(key);
              return isLowerThan ? value <= elementValue : value >= elementValue;
            } else if (isDifferent) {
              return value !== elementValue.toString();
            } else if (isLike) {
              return new RegExp(value, 'i').test(elementValue.toString());
            } else {
              return value === elementValue.toString();
            }
          })
          .reduce((a, b) => (isDifferent ? a && b : a || b));
      });
    }
  });

  // Sort
  if (_sort) {
    const _sortSet = _sort.split(',');
    const _orderSet = (_order || '').split(',').map((s) => s.toLowerCase());

    result = result.sort((a, b) => {
      for (let i = 0; i < _sortSet.length; i++) {
        const _sort = _sortSet[i];
        const _order = _orderSet[i] || 'asc';
        const aValue = get(a, _sort);
        const bValue = get(b, _sort);

        if (aValue === bValue) continue;
        if (_order === 'desc') return aValue < bValue ? 1 : -1;
        return aValue > bValue ? 1 : -1;
      }
      return 0;
    });
  }

  // Slice result
  if (_end || _limit || _page) {
    pagination = {};
    pagination.totalCount = result.length;
  }

  if (_page) {
    _page = parseInt(_page as string, 10);
    _page = _page >= 1 ? _page : 1;
    _limit = parseInt(_limit as string, 10) || 10;

    pagination.totalPage = Math.ceil(result.length / _limit);
    result = result.slice((_page - 1) * _limit, _page * _limit);
  } else if (_end) {
    _start = parseInt(_start as string, 10) || 0;
    _end = parseInt(_end as string, 10);
    result = result.slice(_start, _end);
  } else if (_limit) {
    _start = parseInt(_start as string, 10) || 0;
    _limit = parseInt(_limit as string, 10);
    pagination.totalPage = Math.ceil(result.length / _limit);
    result = result.slice(_start, _start + _limit);
  }

  if (_select) {
    const _selectSet = _select.split(',');
    result = result.map((item) => {
      const obj: any = {};
      _selectSet.forEach((key) => {
        obj[key] = item[key as keyof T];
      });
      return obj;
    });
  }

  if (Object.keys(pagination).length) return { result, pagination };
  return { result };
}

type Pagination = {
  totalCount?: number;
  totalPage?: number;
};
