import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Paintbrush, Code, ClipboardList, Megaphone, Users, Wrench } from 'lucide-react'

interface RaidRole {
  name: string
  filled: boolean
  user?: {
    name: string
    avatar: string
  }
}

function getRoleIcon(role: string) {
  switch (role.toLowerCase()) {
    case 'designer':
      return <Paintbrush className="text-accent-foreground h-4 w-4" />
    case 'developer':
      return <Code className="text-accent-foreground h-4 w-4" />
    case 'production manager':
      return <ClipboardList className="text-accent-foreground h-4 w-4" />
    case 'marketing':
      return <Megaphone className="text-accent-foreground h-4 w-4" />
    case 'community manager':
      return <Users className="text-accent-foreground h-4 w-4" />
    default:
      return <Wrench className="text-accent-foreground h-4 w-4" />
  }
}

interface RaidPartyProps {
  roles: RaidRole[]
  onApply: (role: string) => void
  isApplying: string | null
}

export function RaidParty({ roles, onApply, isApplying }: RaidPartyProps) {
  return (
    <div>
      <h2 className="text-2xl font-heading font-bold mb-2">Raid Party</h2>
      <div className="rounded-lg overflow-hidden">
        <ul className="flex flex-col gap-2">
          {roles.map((role, index) => (
            <li key={index} className="group relative">
              <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">

                  {getRoleIcon(role.name)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium">{role.name}</span>
                </div>

                {role.filled ? (
                  <div className="flex items-center gap-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={role.user!.avatar} alt={role.user!.name} />
                      <AvatarFallback className="text-xs">{role.user!.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground truncate max-w-[100px]">
                      {role.user!.name}
                    </span>
                  </div>
                ) : (
                  <Button 
                    onClick={() => onApply(role.name)}
                    disabled={isApplying === role.name}
                    variant="outline"
                    size="sm"
                  >
                    {isApplying === role.name ? (
                      <span className="flex items-center gap-1">
                        <span className="animate-spin">⏳</span> Applying
                      </span>
                    ) : 'Apply'}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 