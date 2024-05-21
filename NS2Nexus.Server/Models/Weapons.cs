using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class Weapons : IEntityBase
{
    public int Id { get; set; }

    public string? WeaponName { get; set; }

    public virtual ICollection<KillFeed> KillFeeds { get; set; } = new List<KillFeed>();
}
