package snake.server.logic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import snake.server.persistance.EvolutionEntity;
import snake.server.persistance.EvolutionRepository;
import snake.server.rest.dto.EvolutionDTO;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class EvolutionService {

	private final EvolutionRepository evolutionRepository;

	@Autowired
	public EvolutionService(final EvolutionRepository evolutionRepository) {
		this.evolutionRepository = evolutionRepository;
	}

	public List<EvolutionDTO> findAll() {
		final List<EvolutionDTO> result = new ArrayList<>();
		evolutionRepository.findAll().forEach(evolutionEntity -> result.add(evolutionEntity.map2dto()));
		return result;
	}

	public EvolutionDTO createEvolution() {
		final EvolutionEntity evolutionEntity = new EvolutionEntity();
		return evolutionRepository.save(evolutionEntity).map2dto();
	}

	public Long deleteEvolution(final Long evolutionId) {
		evolutionRepository.deleteById(evolutionId);
		return evolutionId;
	}

}
