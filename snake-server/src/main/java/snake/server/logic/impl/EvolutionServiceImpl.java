package snake.server.logic.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import snake.server.logic.EvolutionService;
import snake.server.persistance.entities.EvolutionEntity;
import snake.server.persistance.repositories.EvolutionRepository;
import snake.server.rest.dto.EvolutionDTO;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class EvolutionServiceImpl implements EvolutionService {

	private final EvolutionRepository evolutionRepository;

	@Autowired
	public EvolutionServiceImpl(final EvolutionRepository evolutionRepository) {
		this.evolutionRepository = evolutionRepository;
	}

	@Override
	public List<EvolutionDTO> findAll() {
		final List<EvolutionDTO> result = new ArrayList<>();
		evolutionRepository.findAll().forEach(evolutionEntity -> result.add(evolutionEntity.map2dto()));
		return result;
	}

	@Override
	public EvolutionDTO createEvolution() {
		final EvolutionEntity evolutionEntity = new EvolutionEntity();
		return evolutionRepository.save(evolutionEntity).map2dto();
	}

	@Override
	public Long deleteEvolution(final Long evolutionId) {
		evolutionRepository.deleteById(evolutionId);
		return evolutionId;
	}

}
