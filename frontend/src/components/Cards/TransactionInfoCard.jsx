import React from 'react';
import { LuTrendingUp, LuTrendingDown, LuTrash2, LuUtensils } from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const amountStyle =
    type === 'income'
      ? 'bg-green-600 text-green-100'
      : 'bg-red-600 text-red-100';

  return (
    <div className="group relative flex items-center justify-between gap-4 mt-3 p-4 rounded-md bg-zinc-900 shadow-md hover:bg-zinc-800 transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-700">
          {icon ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : (
            <LuUtensils className="text-white w-6 h-6" />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-gray-400">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={`px-3 py-1.5 rounded-full text-sm font-semibold ${amountStyle}`}>
          <div className="flex items-center gap-1">
            <span>{type === 'income' ? '+' : '-'}₹{amount}</span>
            {type === 'income' ? (
              <LuTrendingUp className="w-4 h-4 text-green-300" />
            ) : (
              <LuTrendingDown className="w-4 h-4 text-red-300" />
            )}
          </div>
        </div>

        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-500 transition-colors"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;