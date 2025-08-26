import { LogOutIcon } from "lucide-react"
import { useView } from "../../contexts/use-view"
import { Button } from "../ui/button"

export function Header() {
  const { view, changeView } = useView()
  return (
    <>
      <header className="p-4 border-b">
        <div className="container m-auto flex items-center justify-between">

          <img src="/" alt="Logo" />

          <nav>
            <ul className="flex gap-4">

              <li>
                <button
                  onClick={() => changeView('userpage')}
                  type="button"
                  className="group flex items-center gap-4 [perspective:1000px] cursor-pointer"
                >
                  <span className={`
                  relative inline-block
                  transition-transform duration-150 
                  [transform-style:preserve-3d] [transform-origin:center_top]
                  group-hover:[transform:rotateX(90deg)_translateY(-22px)]
                  ${view === 'userpage'
                      ? "text-primary"
                      : "text-zinc-700 dark:text-white"
                    }
                `}>
                    Usuários
                    <span
                      className={`
                    absolute top-full left-0 w-full h-full text-center 
                    transition-colors duration-150 
                    [transform:rotateX(-90deg)] [transform-origin:center_top] 
                    content-[attr(data-hover)]
                    ${view === 'userpage'
                          ? "text-primary"
                          : "text-zinc-700 dark:text-white"
                        }
                    group-hover:text-primary  group-hover:dark:text-primary
                  `}
                      aria-hidden="true"
                    >
                      Usuários
                    </span>
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => changeView('checkerpage')}
                  type="button"
                  className="group flex items-center gap-4 [perspective:1000px] cursor-pointer"
                >
                  <span className={`
                  relative inline-block
                  transition-transform duration-150 
                  [transform-style:preserve-3d] [transform-origin:center_top]
                  group-hover:[transform:rotateX(90deg)_translateY(-22px)]
                  ${view === 'checkerpage'
                      ? "text-primary"
                      : "text-zinc-700 dark:text-white"
                    }
                `}>
                    Checker
                    <span
                      className={`
                    absolute top-full left-0 w-full h-full text-center 
                    transition-colors duration-150 
                    [transform:rotateX(-90deg)] [transform-origin:center_top] 
                    content-[attr(data-hover)]
                    ${view === 'checkerpage'
                          ? "text-primary"
                          : "text-zinc-700 dark:text-white"
                        }
                    group-hover:text-primary  group-hover:dark:text-primary
                  `}
                      aria-hidden="true"
                    >
                      Checker
                    </span>
                  </span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => changeView('anatelpage')}
                  type="button"
                  className="group flex items-center gap-4 [perspective:1000px] cursor-pointer"
                >
                  <span className={`
                  relative inline-block
                  transition-transform duration-150 
                  [transform-style:preserve-3d] [transform-origin:center_top]
                  group-hover:[transform:rotateX(90deg)_translateY(-22px)]
                  ${view === 'anatelpage'
                      ? "text-primary"
                      : "text-zinc-700 dark:text-white"
                    }
                `}>
                    Consulta Base Numérica Anatel
                    <span
                      className={`
                    absolute top-full left-0 w-full h-full text-center 
                    transition-colors duration-150 
                    [transform:rotateX(-90deg)] [transform-origin:center_top] 
                    content-[attr(data-hover)]
                    ${view === 'anatelpage'
                          ? "text-primary"
                          : "text-zinc-700 dark:text-white"
                        }
                    group-hover:text-primary  group-hover:dark:text-primary
                  `}
                      aria-hidden="true"
                    >
                      Consulta Base Numérica Anatel
                    </span>
                  </span>
                </button>
              </li>

            </ul>
          </nav>

          <div>
            <Button variant={"outline"} size={"icon"}>
              <LogOutIcon />
            </Button>
          </div>

        </div>


      </header>
    </>
  )
}