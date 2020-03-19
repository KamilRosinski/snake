package snake.server.persistance;

import lombok.Data;
import snake.server.rest.dto.EvolutionDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
public class EvolutionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	public EvolutionDTO map2dto() {
		return new EvolutionDTO(id);
	}

}
