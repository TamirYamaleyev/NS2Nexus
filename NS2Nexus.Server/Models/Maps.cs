using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class Maps : IEntityBase
{
    public int Id { get; set; }

    public string MapName { get; set; } = null!;

    public virtual ICollection<RoundInfo> RoundInfos { get; set; } = new List<RoundInfo>();
}
