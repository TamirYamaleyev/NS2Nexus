using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class GameModes : IEntityBase
{
    public int Id { get; set; }

    public string GameModeName { get; set; } = null!;

    public virtual ICollection<RoundInfo> RoundInfos { get; set; } = new List<RoundInfo>();
}
