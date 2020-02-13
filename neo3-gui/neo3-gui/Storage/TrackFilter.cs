﻿using System;
using System.Collections.Generic;

namespace Neo.Storage
{
    public class TrackFilter
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public List<UInt160> From { get; set; }
        public List<UInt160> To { get; set; }
        public UInt160 AssetId { get; set; }
        public uint? BlockHeight { get; set; }
        public UInt256 TxId { get; set; }

        public List<UInt160> FromOrTo { get; set; }

        /// <summary>
        /// start from 1
        /// </summary>
        public int? PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
