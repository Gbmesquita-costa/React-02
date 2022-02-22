import { useEffect, useState } from "react";
import { Button } from './Button';
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface Sideprops {
    propriedades: {
      handleClickButton: (id: number) => void,
      selectedGenreId: Number
    }
}

export function SideBar(props: Sideprops ) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

    return(
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.propriedades.handleClickButton(genre.id)}
              selected={props.propriedades.selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    )
}