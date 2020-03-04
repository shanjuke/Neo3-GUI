﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Neo.Common;
using Neo.Common.Storage;
using Neo.Common.Utility;
using Neo.Ledger;
using Neo.Models;
using Neo.Models.Transactions;
using Neo.Network.P2P.Payloads;

namespace Neo.Services.ApiServices
{
    public class TransactionApiService : ApiService
    {


        /// <summary>
        /// query transaction info
        /// </summary>
        /// <param name="txId"></param>
        /// <returns></returns>
        public async Task<object> GetTransaction(UInt256 txId)
        {
            var transaction = Blockchain.Singleton.GetTransaction(txId);
            if (transaction == null)
            {
                return Error(ErrorCode.TxIdNotFound);
            }

            var transactionModel = new TransactionModel(transaction);

            TransactionState txState = Blockchain.Singleton.View.Transactions.TryGet(txId);
            if (txState != null)
            {
                Header header = Blockchain.Singleton.GetHeader(txState.BlockIndex);
                transactionModel.BlockHash = header.Hash;
                transactionModel.BlockHeight = txState.BlockIndex;
                transactionModel.Confirmations = Blockchain.Singleton.Height - header.Index + 1;
            }
            using var db = new TrackDB();
            var trans = db.FindTransfer(new TrackFilter() { TxIds = new List<UInt256>() { txId } }).List;
            transactionModel.Transfers = trans.Select(tx => Helpers.ToTransferModel((TransferInfo) tx)).ToList();
            var notifies = db.GetNotifyEventsByTxId(txId);
            if (notifies.NotEmpty())
            {
                transactionModel.Notifies.AddRange(notifies.Select(n => n.State.DeserializeJson<NotifyModel>()));
            }
            return transactionModel;
        }


        public async Task<object> GetUnconfirmTransactions()
        {
            var tempTransactions = UnconfirmedTransactionCache.GetUnconfirmedTransactions();
            return tempTransactions.Select(t => t.ToTransactionPreviewModel());
        }


        public async Task<object> RemoveUnconfirmTransaction(UInt256 txId)
        {
            UnconfirmedTransactionCache.RemoveUnconfirmedTransactions(txId);
            return true;
        }

        /// <summary>
        /// query transaction info
        /// </summary>
        /// <returns></returns>
        public async Task<PageList<TransferInfo>> QueryTransaction(TrackFilter filter)
        {
            using var db = new TrackDB();
            var result = db.FindTransfer(filter) as PageList<TransferInfo>;
            return result;
        }

    }
}