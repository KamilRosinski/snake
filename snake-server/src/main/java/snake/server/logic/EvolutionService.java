package snake.server.logic;

import snake.server.rest.dto.EvolutionDTO;

import java.util.List;

public interface EvolutionService {

	List<EvolutionDTO> findAll();
	EvolutionDTO createEvolution();
	Long deleteEvolution(Long evolutionId);

}
