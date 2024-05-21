using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class Lifeforms : IEntityBase
{
    public int Id { get; set; }

    public string LifeformName { get; set; } = null!;

    public virtual ICollection<ClassPlaytime> ClassPlaytimes { get; set; } = new List<ClassPlaytime>();

    public virtual ICollection<KillFeed> KillFeedKillerLifeforms { get; set; } = new List<KillFeed>();

    public virtual ICollection<KillFeed> KillFeedVictimLifeforms { get; set; } = new List<KillFeed>();
}
