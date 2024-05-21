using NS2Nexus.Server.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace NS2Nexus.Server.Models;

public partial class KillFeed : IEntityBase
{
    public int Id { get; set; }

    public int RoundId { get; set; }

    public int KillerLifeformId { get; set; }

    public int KillerTeamNumber { get; set; }

    public int KillerId { get; set; }

    public int KillerWeaponId { get; set; }

    public int VictimLifeformId { get; set; }

    public int VictimId { get; set; }

    public virtual Player? Killer { get; set; }

    public virtual Lifeforms? KillerLifeform { get; set; }

    public virtual Weapons? KillerWeapon { get; set; }

    public virtual RoundInfo? Round { get; set; }

    public virtual Player? Victim { get; set; }

    public virtual Lifeforms? VictimLifeform { get; set; }
}
